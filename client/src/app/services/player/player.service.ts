import { Injectable, signal } from '@angular/core';
import { SocketManagerService } from '../socket-manager/socket-manager.service';
import { Player } from '@common/rooms/player.interface';
import { Color } from '@common/game-architechture/color.enum';
import { CAPTURE_MADE_MESSAGE } from '@common/socket/socket-messages.consts';
import { getPieceType } from '@common/game-architechture/movement-utils.functions';

@Injectable({
  providedIn: 'root',
})
export class PlayerService {
  private readonly _players = signal<Player[]>([]);
  info: Player = {name: 'placeholder'};

  constructor(private readonly socketManager: SocketManagerService) {}

  get players(): Player[] {
    return this._players();
  }

  setInfo(players: Player[]) {
    this.sortCaptured(players);
    this._players.set(players);
    const me = players.find(p => p.id === this.socketManager.id);
    if (me) {
      this.info = me;
    }
  }

  get color(): Color {
    return this.info.color!;
  }

  get name(): string  {
    return this.info.name;
  }

  get id(): string {
    return this.info.id!;
  }

  private sortCaptured (players : Player[]) {
    for (const player of players) {
      player.captured?.sort((a) => { return getPieceType(a)});
    }
  }

  clean() {
    this.info = {name: 'placeholder'};
    this.socketManager.off(CAPTURE_MADE_MESSAGE);
    this._players.set([]);
  }
}

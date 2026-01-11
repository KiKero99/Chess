import { Injectable } from '@angular/core';
import { SocketManagerService } from '../socket-manager/socket-manager.service';
import { PLAYER_INFO_MESSAGE } from '@common/socket/socket-messages.consts';
import { Player } from '@common/rooms/player.interface';
import { Color } from '@common/game-architechture/color.enum';

@Injectable({
  providedIn: 'root',
})
export class PlayerService {
  info: Player = {name: 'placeholder'};

  constructor(private readonly socketManager: SocketManagerService) {}

  setInfo(players: Player[]) {
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
}

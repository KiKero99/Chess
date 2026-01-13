import { inject, Injectable, signal } from '@angular/core';
import { Board } from '@common/game-architechture/board.type';
import { Color } from '@common/game-architechture/color.enum';
import { canMove, encodeMove } from '@common/game-architechture/movement-utils.functions';
import { Game } from '@common/rooms/game.interface';
import { MoveRequest } from '@common/rooms/move-request.interface';
import { SocketManagerService } from '../socket-manager/socket-manager.service';
import { MAKE_MOVE_MESSAGE, MOVE_MADE_MESSAGE } from '@common/socket/socket-messages.consts';
import { RoomManagerService } from '../room-manager/room-manager.service';
import { SoundManagerService } from '../sound-manager/sound-manager.service';
import { CAPTURE_SOUND, MOVE_SOUND } from '@app/constants/sound.consts';
import { Piece } from '@common/game-architechture/piece.enum';
import { Room } from '@common/rooms/room.interface';
import { PlayerService } from '../player/player.service';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  private readonly _game = signal<Game | null>(null);
  private isMoveCapture: boolean = false;
  private readonly socketManager: SocketManagerService = inject(SocketManagerService);
  private readonly roomManager: RoomManagerService = inject(RoomManagerService);
  private readonly soundManager: SoundManagerService = inject(SoundManagerService);
  private readonly playerManager: PlayerService = inject(PlayerService);

  get board(): Board {
    const g = this._game();
    if (!g) throw new Error('Game not initialized');
    return g.board;
  }

  get turn(): Color {
    return this._game()!.turn;
  }

  listenToGameEvents() {
    this.socketManager.connect();
    this.socketManager.on(MOVE_MADE_MESSAGE, (room: Room) => {
      this.playerManager.setInfo(room.players);
      this.setGame(room.game);
      if (this.isMoveCapture) {
        this.soundManager.playFx(CAPTURE_SOUND);
        return;
      }
      this.soundManager.playFx(MOVE_SOUND);
    })
  }

  setGame(game: Game) {
    game.board = new Uint8Array(game.board);
    this._game.set(game); 
  }

  setIsMoveCapture(index: number) {
    this.isMoveCapture = this.board[index] !== Piece.Empty;
  }

  isInitialized(): boolean {
    return !!this._game();
  }

  canMove(from: number, to: number): boolean {
    return canMove(from, to, this.board);
  }

  moveRequest(from: number, to: number) {
    this.socketManager.send(MAKE_MOVE_MESSAGE, { roomId: this.roomManager.id, move: encodeMove(from, to) } as MoveRequest)
  }

  clean()  {
    this._game.set(null);
    this.socketManager.off(MOVE_MADE_MESSAGE);
  }

  // resetToStartingPosition(): void {
  //   this.game!.board = GameService.createStartingPosition();
  // }

  // resetToEmpty(): void {
  //   this.game!.board = GameService.createEmptyBoard();
  // }
}

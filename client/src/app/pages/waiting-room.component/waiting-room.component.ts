import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { RoomManagerService } from '@app/services/room-manager/room-manager.service';
import { SocketManagerService } from '@app/services/socket-manager/socket-manager.service';
import { GAME_STARTED_MESSAGE, LEAVE_ROOM_MESSAGE } from '@common/socket/socket-messages.consts';
import { JoinLeaveRequest } from '@common/socket/join-leave-request.interface';
import { Player } from '@common/rooms/player.interface';
import { GameService } from '@app/services/game/game.service';
import { Room } from '@common/rooms/room.interface';
import { PlayerService } from '@app/services/player/player.service';

@Component({
  selector: 'app-waiting-room.component',
  imports: [],
  templateUrl: './waiting-room.component.html',
  styleUrl: './waiting-room.component.scss',
})
export class WaitingRoomComponent {
  private readonly playerService: PlayerService = inject(PlayerService);

  constructor(private readonly router: Router, private readonly roomManager: RoomManagerService, private readonly socketManager: SocketManagerService, private readonly gameService: GameService) {
    this.socketManager.on(GAME_STARTED_MESSAGE, (room: Room) => {
      this.gameService.setGame(room.game);
      this.playerService.setInfo(room.players);
       this.roomManager.setRoom(room.id);
      this.router.navigate(['/game']);
    });
  }

  get roomCode() {
    return this.roomManager.id;
  }

  copyCode() {
    navigator.clipboard.writeText(this.roomCode);
  }

  goBack() {
    this.socketManager.send(LEAVE_ROOM_MESSAGE, {roomId: this.roomCode, player: {name: "pelusy", id: ""} as Player} as JoinLeaveRequest);
    this.router.navigate(['/']);
  }
}

import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RoomManagerService } from '@app/services/room-manager/room-manager.service';
import { SocketManagerService } from '@app/services/socket-manager/socket-manager.service';
import { LEAVE_ROOM_MESSAGE } from '@common/socket/socket-messages.consts';
import { JoinLeaveRequest } from '@common/socket/join-leave-request.interface';
import { Player } from '@common/rooms/player.interface';

@Component({
  selector: 'app-waiting-room.component',
  imports: [],
  templateUrl: './waiting-room.component.html',
  styleUrl: './waiting-room.component.scss',
})
export class WaitingRoomComponent {

  constructor(private readonly router: Router, private readonly roomManager: RoomManagerService, private readonly socketManager: SocketManagerService) {}

  get roomCode() {
    return this.roomManager.id;
  }

  copyCode() {
    navigator.clipboard.writeText(this.roomCode);
  }

  goBack() {
    this.socketManager.send(LEAVE_ROOM_MESSAGE, {roomId: this.roomCode, player: {name: "Pelusy", id: ""} as Player} as JoinLeaveRequest);
    this.router.navigate(['/']);
  }
}

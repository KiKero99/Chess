import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RoomManagerService } from '@app/services/room-manager/room-manager.service';

@Component({
  selector: 'app-waiting-room.component',
  imports: [],
  templateUrl: './waiting-room.component.html',
  styleUrl: './waiting-room.component.scss',
})
export class WaitingRoomComponent {

  constructor(private readonly router: Router, private readonly roomManager: RoomManagerService) {}

  get roomCode() {
    return this.roomManager.id;
  }

  copyCode() {
    navigator.clipboard.writeText(this.roomCode);
  }

  goBack() {
    this.router.navigate(['/']);
  }
}

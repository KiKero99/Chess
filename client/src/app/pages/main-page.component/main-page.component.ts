import { Player } from '@common/player.interface';
import { Component, OnDestroy  } from '@angular/core';
import { Router } from '@angular/router';
import { SocketManagerService } from '@app/services/socket-manager/socket-manager.service';
import { CREATE_GAME_MESSAGE, GAME_CREATED_MESSAGE } from '@common/socket-messages.consts';
import { RoomManagerService } from '@app/services/room-manager/room-manager.service';

@Component({
  selector: 'app-main-page',
  imports: [],
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.scss',
})
export class MainPageComponent implements OnDestroy  {
  constructor(private readonly router: Router, private readonly socketManager: SocketManagerService, private readonly roomManager: RoomManagerService) {
    this.socketManager.connect();

    this.socketManager.on(GAME_CREATED_MESSAGE, (roomId: string) => {
      this.roomManager.setRoom(roomId);
      this.router.navigate(['/lobby']);
    });
  }

  ngOnDestroy() {
    this.socketManager.off(CREATE_GAME_MESSAGE)
  }

  createRoom(): void {
    this.socketManager.send(CREATE_GAME_MESSAGE, {name: "pelusy"} as Player)
  }
}

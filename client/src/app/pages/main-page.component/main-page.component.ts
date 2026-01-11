import { Player } from '@common/rooms/player.interface';
import { Component, OnDestroy, HostListener, inject  } from '@angular/core';
import { Router } from '@angular/router';
import { SocketManagerService } from '@app/services/socket-manager/socket-manager.service';
import { CREATE_GAME_MESSAGE, GAME_CREATED_MESSAGE, GAME_STARTED_MESSAGE, JOIN_REQUEST_MESSAGE } from '@common/socket/socket-messages.consts';
import { RoomManagerService } from '@app/services/room-manager/room-manager.service';
import { FormsModule } from '@angular/forms';
import { JoinLeaveRequest } from '@common/socket/join-leave-request.interface';
import { Game } from '@common/rooms/game.interface';
import { GameService } from '@app/services/game/game.service';

@Component({
  selector: 'app-main-page',
  imports: [FormsModule],
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.scss',
})
export class MainPageComponent implements OnDestroy  {
  roomCode: string = '';
  private readonly gameService: GameService = inject(GameService);
  private readonly router: Router = inject(Router);
  private readonly roomManager: RoomManagerService = inject(RoomManagerService);

  constructor(private readonly socketManager: SocketManagerService) {
    this.socketManager.connect();

    this.socketManager.on(GAME_CREATED_MESSAGE, (roomId: string) => {
      this.roomManager.setRoom(roomId);
      this.router.navigate(['/lobby']);
    });

    this.socketManager.on(GAME_STARTED_MESSAGE, (game: Game) => {
      this.gameService.setGame(game);
      this.router.navigate(['/game']);
    });
  }

  ngOnDestroy() {
    this.socketManager.off(CREATE_GAME_MESSAGE)
  }

  @HostListener('window:keydown.enter')
  handleEnterKey() {
    this.joinRoom();
  }

  createRoom() {
    this.socketManager.send(CREATE_GAME_MESSAGE, {name: "pelusy"} as Player)
  }

  joinRoom() {
    if (this.roomCode === '') return;
    if (this.roomCode.replaceAll(/\s+/g, '') === '') {
      this.roomCode = '';
      return;
    }
    
    this.socketManager.send(JOIN_REQUEST_MESSAGE, { roomId: this.roomCode, player: {name: 'pelusy'} as Player } as JoinLeaveRequest);
  }
}

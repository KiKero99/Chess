import { Component, inject, OnDestroy } from '@angular/core';
import { BoardComponent } from '@app/components/board/board.component';
import { CapturedPiecesComponent } from '@app/components/captured-pieces/captured-pieces.component';
import { GameService } from '@app/services/game/game.service';
import { Router } from '@angular/router';
import { PlayerService } from '@app/services/player/player.service';
import { Player } from '@common/rooms/player.interface';

@Component({
  selector: 'app-game',
  imports: [BoardComponent, CapturedPiecesComponent],
  templateUrl: './game.component.html',
  styleUrl: './game.component.scss',
})
export class GameComponent implements OnDestroy {
  private readonly playerService: PlayerService = inject(PlayerService);
  constructor(private readonly gameService:  GameService, private readonly router: Router) {
    if (!this.gameService.isInitialized()) this.navigateHome();
    this.gameService.listenToGameEvents();
  }

  get captured(): Player[] {
    return this.playerService.players;
  }

  ngOnDestroy() {
    this.gameService.clean();
    this.playerService.clean();
  }

  navigateHome() {
     this.router.navigate(['']);
  }
}

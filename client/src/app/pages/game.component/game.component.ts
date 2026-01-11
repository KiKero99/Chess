import { Component, Inject } from '@angular/core';
import { BoardComponent } from '@app/components/board/board.component';
import { GameService } from '@app/services/game/game.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-game',
  imports: [BoardComponent],
  templateUrl: './game.component.html',
  styleUrl: './game.component.scss',
})
export class GameComponent {
  constructor(private readonly gameService:  GameService, private readonly router: Router) {
    if (!this.gameService.isInitialized()) this.navigateHome();
  }

  navigateHome() {
     this.router.navigate(['']);
  }
}

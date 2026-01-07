import { Component } from '@angular/core';
import { BoardComponent } from '@app/components/board/board.component';

@Component({
  selector: 'app-game',
  imports: [BoardComponent],
  templateUrl: './game.component.html',
  styleUrl: './game.component.scss',
})
export class GameComponent {

}

import { Component } from '@angular/core';
import { GameService } from '@app/services/game/game.service';
import { ImageManagerService } from '@app/services/piece-image-manager/image-manager.service';
import { AvailableMovesManagagerService } from '@app/services/availabe-moves-manager/available-moves-managager.service';
import { Piece } from '@common/piece.enum';

@Component({
  selector: 'app-board',
  imports: [],
  templateUrl: './board.component.html',
  styleUrl: './board.component.scss',
})
export class BoardComponent {
  constructor(public gameService: GameService,  private readonly images: ImageManagerService, private readonly availableMovesManager: AvailableMovesManagagerService) {}

  isLightSquare(index: number): boolean {
    const row = Math.floor(index / 8);
    const col = index % 8;
    return (row + col) % 2 === 0;
  }

  isHighlighted(index: number) {
    return this.availableMovesManager.availableMoves.includes(index) && this.gameService.board[index] === 0;
  }

  getPieceImage(square: number): string {
    return this.images.getImage(square);
  }

  onClickSquare(square: number, index: number){
    this.availableMovesManager.onClick(square as Piece, index);
  }
}

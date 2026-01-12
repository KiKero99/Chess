import { Component, inject } from '@angular/core';
import { GameService } from '@app/services/game/game.service';
import { ImageManagerService } from '@app/services/piece-image-manager/image-manager.service';
import { AvailableMovesManagagerService } from '@app/services/availabe-moves-manager/available-moves-managager.service';
import { Piece } from '@common/game-architechture/piece.enum';
import { PlayerService } from '@app/services/player/player.service';
import { getPieceColor } from '@common/game-architechture/movement-utils.functions';

@Component({
  selector: 'app-board',
  imports: [],
  templateUrl: './board.component.html',
  styleUrl: './board.component.scss',
})
export class BoardComponent {
  private readonly playerService: PlayerService = inject(PlayerService);
  constructor(public gameService: GameService,  private readonly images: ImageManagerService, private readonly availableMovesManager: AvailableMovesManagagerService) {
  }

  isLightSquare(index: number): boolean {
    const row = Math.floor(index / 8);
    const col = index % 8;
    return (row + col) % 2 === 0;
  }

  isHighlighted(index: number): boolean {
    if (this.gameService.turn !== this.playerService.color) return false;
    return this.availableMovesManager.availableMoves.includes(index) && this.gameService.canMove(this.availableMovesManager.actualPos, index);
  }

  getPieceImage(square: number): string {
    return this.images.getImage(square);
  }

  onClickSquare(square: number, index: number){
    if (this.availableMovesManager.isAPieceSelected && this.isHighlighted(index)) {
      this.gameService.movePiece(this.availableMovesManager.actualPos, index);
      this.availableMovesManager.onClick(this.gameService.board[index] as Piece, index);
      return;
    }
    if (this.playerService.color !== getPieceColor(square)) return;
    this.availableMovesManager.onClick(square as Piece, index);
  }
}

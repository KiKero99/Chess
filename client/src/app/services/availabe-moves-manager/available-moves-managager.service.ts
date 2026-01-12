import { Injectable } from '@angular/core';
import { Piece } from '@common/game-architechture/piece.enum';
import { lookupTables, MoveLookupTables } from '@common/game-architechture/lookup-tables.const';
import { GameService } from '@app/services/game/game.service';
import { getPieceType, availableMoves } from '@common/game-architechture/movement-utils.functions';

@Injectable({
  providedIn: 'root',
})
export class AvailableMovesManagagerService {
  private selectedPiece: Piece = Piece.Empty;
  private selectedPos: number = 0;

  private readonly lookupTables: MoveLookupTables = lookupTables;

  constructor (private readonly gameService: GameService) {
}

  get availableMoves(): Uint8Array {
    return availableMoves(this.selectedPiece, this.selectedPos, this.lookupTables, this.gameService.board);
  }

  get isAPieceSelected(): boolean {
    return this.selectedPiece !== Piece.Empty;
  }

  get actualPos() {
    return this.selectedPos;
  }

  onClick(piece: Piece, pos: number) {
    this.selectedPiece = getPieceType(piece);
    this.selectedPos = pos;
  }

  clean() {
    this.selectedPiece = Piece.Empty;
    this.selectedPos = 0;
  }
}

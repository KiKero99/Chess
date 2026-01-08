import { Injectable } from '@angular/core';
import { Piece } from '@common/piece.enum';
import { kingMoves, knightMoves, queenMoves, rookMoves, pawnMoves, bishopMoves, EMPTY_MOVE } from '@common/lookup-tables.const';
import { GameService } from '@app/services/game/game.service';

@Injectable({
  providedIn: 'root',
})
export class AvailableMovesManagagerService {
  private selectedPiece: Piece = Piece.Empty;
  private selectedPos: number = 0;

  private readonly lookUpTables: Map<Piece, Uint8Array[]> = new  Map<Piece, Uint8Array[]>();

  constructor () {
    this.lookUpTables.set(Piece.King, kingMoves);
    this.lookUpTables.set(Piece.Knight, knightMoves);
    this.lookUpTables.set(Piece.Queen, queenMoves);
    this.lookUpTables.set(Piece.Rook, rookMoves);
    this.lookUpTables.set(Piece.Pawn, pawnMoves);
    this.lookUpTables.set(Piece.Bishop, bishopMoves);
  }

  get availableMoves(): Uint8Array {
    if (this.selectedPiece === Piece.Empty) return new Uint8Array([EMPTY_MOVE]);
    return this.lookUpTables.get(this.selectedPiece)![this.selectedPos];
  }

  get isAPieceSelected(): boolean {
    return this.selectedPiece !== Piece.Empty;
  }

  get actualPos() {
    return this.selectedPos;
  }

  onClick(piece: Piece, pos: number) {
    this.selectedPiece = GameService.getPieceType(piece);
    this.selectedPos = pos;
  }
}

import { Injectable } from '@angular/core';
import { Piece } from '@common/piece.enum';
import { kingMoves, knightMoves, queenMoves, rookMoves, pawnMoves, bishopMoves, pawnCaptures,EMPTY_MOVE } from '@common/lookup-tables.const';
import { GameService } from '@app/services/game/game.service';

@Injectable({
  providedIn: 'root',
})
export class AvailableMovesManagagerService {
  private selectedPiece: Piece = Piece.Empty;
  private selectedPos: number = 0;

  private readonly lookUpTables: Map<Piece, Uint8Array[]> = new  Map<Piece, Uint8Array[]>();
  private readonly pawnLookUpTables: Uint8Array[][] = pawnMoves;
  private readonly pawnCapturesTables: Uint8Array[][] = pawnCaptures;

  constructor (private readonly gameService: GameService) {
    this.lookUpTables.set(Piece.King, kingMoves);
    this.lookUpTables.set(Piece.Knight, knightMoves);
    this.lookUpTables.set(Piece.Queen, queenMoves);
    this.lookUpTables.set(Piece.Rook, rookMoves);
    this.lookUpTables.set(Piece.Bishop, bishopMoves);
  }

  get availableMoves(): Uint8Array {
    if (this.selectedPiece === Piece.Empty) return new Uint8Array([EMPTY_MOVE]);

    if (this.selectedPiece === Piece.Pawn) {
      const color = GameService.getPieceColor(
        this.gameService.board[this.selectedPos]
      );

      const moves = this.pawnLookUpTables[color][this.selectedPos];
      const captures = pawnCaptures[color][this.selectedPos];

      return new Uint8Array([...moves, ...captures]);
    }

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

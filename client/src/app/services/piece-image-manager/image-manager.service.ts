import { Injectable } from '@angular/core';
import { Piece } from '@common/game-architechture/piece.enum';

@Injectable({
  providedIn: 'root',
})
export class ImageManagerService {
  private readonly pieces: Map<Piece , string> = new Map<Piece, string>();

  constructor () {
    this.pieces.set(Piece.White | Piece.King, '/assets/pieces/wKing.png');
    this.pieces.set(Piece.White | Piece.Queen, '/assets/pieces/wQueen.png');
    this.pieces.set(Piece.White | Piece.Rook, '/assets/pieces/wRook.png');
    this.pieces.set(Piece.White | Piece.Bishop, '/assets/pieces/wBishop.png');
    this.pieces.set(Piece.White | Piece.Knight, '/assets/pieces/wKnight.png');
    this.pieces.set(Piece.White | Piece.Pawn, '/assets/pieces/wPawn.png');

    this.pieces.set(Piece.Black | Piece.King, '/assets/pieces/bKing.png');
    this.pieces.set(Piece.Black | Piece.Queen, '/assets/pieces/bQueen.png');
    this.pieces.set(Piece.Black | Piece.Rook, '/assets/pieces/bRook.png');
    this.pieces.set(Piece.Black | Piece.Bishop, '/assets/pieces/bBishop.png');
    this.pieces.set(Piece.Black | Piece.Knight, '/assets/pieces/bKnight.png');
    this.pieces.set(Piece.Black | Piece.Pawn, '/assets/pieces/bPawn.png');
  }

  public getImage(piece: number): string {
    return this.pieces.get(piece as Piece) || "";
  }
}

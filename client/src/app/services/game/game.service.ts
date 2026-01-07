import { Injectable } from '@angular/core';
import { Board } from '@common/board.type';
import { Piece } from '@common/piece.enum';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  board: Board;

  constructor() {
    this.board = GameService.createEmptyBoard();
    this.resetToStartingPosition();
  }

  static createEmptyBoard(): Board {
    return new Uint8Array(64);
  }

  static createStartingPosition(): Board {
    const board = GameService.createEmptyBoard();

    const backRank: Piece[] = [
      Piece.Rook, Piece.Knight, Piece.Bishop, Piece.Queen,
      Piece.King, Piece.Bishop, Piece.Knight, Piece.Rook
    ];

    for (let file = 0; file < 8; file++) {
      board[file] = backRank[file] | Piece.White;
      board[8 + file] = Piece.Pawn | Piece.White;
    }

    for (let file = 0; file < 8; file++) {
      board[48 + file] = Piece.Pawn | Piece.Black;
      board[56 + file] = backRank[file] | Piece.Black;
    }

    return board;
  }

  resetToStartingPosition(): void {
    this.board = GameService.createStartingPosition();
  }

  resetToEmpty(): void {
    this.board = GameService.createEmptyBoard();
  }
}

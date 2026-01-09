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

  static getPieceType(square: number): Piece {
    return square & 0b111;
  }

  static getPieceColor(piece: Piece): 0 | 1 {
    return (piece & Piece.Black) === 0 ? 0 : 1;
  }

  static areSameColor(piece1: Piece, piece2: Piece): boolean {
    return ((piece1 ^ piece2) & Piece.Black) === 0;
  }

  canMove(from: number, to: number): boolean {
    const piece = this.board[from];
    const target = this.board[to];

    if (piece === Piece.Empty) return false;

    if ( GameService.getPieceType(piece) === Piece.Pawn) {
      return this.canPawnMove(from, to, piece, target);
    }

    return target 
    
    
    === Piece.Empty || !GameService.areSameColor(piece, target);
  }

  canPawnMove(from: number, to: number, piece: Piece, target: Piece) {
    const color = GameService.getPieceColor(piece);
    const direction = color === 0 ? 1 : -1;

    const fromRow = Math.floor(from / 8);
    const toRow   = Math.floor(to / 8);
    const fromCol = from % 8;
    const toCol   = to % 8;

    const rowDiff = toRow - fromRow;
    const colDiff = Math.abs(toCol - fromCol);

    //In front
    if (colDiff === 0) {
      //Only 1 up
      if (rowDiff === direction && target === Piece.Empty) {
        return true;
      }

      //First Pawn Move
      const startRow = GameService.getPieceColor(piece) === 0 ? 1 : 6;
      const intermediateSquare = from + direction * 8; // one square ahead

      if (
          rowDiff === 2 * direction &&
          fromRow === startRow &&
          target === Piece.Empty &&
          this.board[intermediateSquare] === Piece.Empty
      ) {
          return true;
      }

      return false;
    }

    //Diagonal
    if (colDiff === 1 && rowDiff === direction) {
      return (
        target !== Piece.Empty &&
        !GameService.areSameColor(piece, target)
      );
    }

    return false;
  }

  resetToStartingPosition(): void {
    this.board = GameService.createStartingPosition();
  }

  resetToEmpty(): void {
    this.board = GameService.createEmptyBoard();
  }

  movePiece(position: number, target: number) {
    this.board[target] = this.board[position];
    this.board[position] = Piece.Empty;
  }
}

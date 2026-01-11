import { Injectable } from '@angular/core';
import { Board } from '@common/game-architechture/board.type';
import { Piece } from '@common/game-architechture/piece.enum';
import { Game } from '@common/rooms/game.interface';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  private game: Game | null = null;

  get board(): Board {
    if (!this.game) throw new Error("There is no game initialized");
    return this.game.board;
  }

  setGame(game: Game) {
    game.board = new Uint8Array(game.board as any);
    this.game = game;
  }

  isInitialized(): boolean {
    return !!this.game;
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
    const piece = this.game?.board[from];
    const target = this.game?.board[to];

    if (piece === Piece.Empty) return false;

    if ( GameService.getPieceType(piece!) === Piece.Pawn) {
      return this.canPawnMove(from, to, piece!, target!);
    }

    return target 
    
    
    === Piece.Empty || !GameService.areSameColor(piece!, target!);
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
          this.game?.board[intermediateSquare] === Piece.Empty
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

  clean()  {
    this.game = null;
  }

  // resetToStartingPosition(): void {
  //   this.game!.board = GameService.createStartingPosition();
  // }

  // resetToEmpty(): void {
  //   this.game!.board = GameService.createEmptyBoard();
  // }

  movePiece(position: number, target: number) {
    this.game!.board[target] = this.board[position];
    this.game!.board[position] = Piece.Empty;
  }
}

import { Injectable } from '@angular/core';
import { Board } from '@common/game-architechture/board.type';
import { Color } from '@common/game-architechture/color.enum';
import { Piece } from '@common/game-architechture/piece.enum';
import { canMove } from '@common/game-architechture/movement-utils.functions';
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

  get turn(): Color {
    return this.game?.turn!;
  }

  setGame(game: Game) {
    game.board = new Uint8Array(game.board as any);
    this.game = game;
  }

  isInitialized(): boolean {
    return !!this.game;
  }

  canMove(from: number, to: number): boolean {
    return canMove(from, to, this.board);
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

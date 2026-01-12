import { Piece } from "../game-architechture/piece.enum";
import { Board } from "./board.type";
import { EMPTY_MOVE, MoveLookupTables } from "./lookup-tables.const";

export function areSameColor(piece1: Piece, piece2: Piece): boolean {
    return ((piece1 ^ piece2) & Piece.Black) === 0;
}

export function getPieceType(square: number) {
    return square & 0b111;
}

export function getPieceColor(piece: Piece): 0 | 1 {
    return (piece & Piece.Black) === 0 ? 0 : 1;
}

export function getSlidingOrJumpingMoves(from: number, piece: Piece, lookUpTables: Uint8Array[], board: Board): Uint8Array {
    const table = lookUpTables[from];

    const valid: number[] = [];
    
    let hasBeenBlocked = false;
    for (const to of table) {
      if (to === EMPTY_MOVE) {
        hasBeenBlocked = false;
        continue;
      }

      if (hasBeenBlocked) continue;

      const target = board[to];

      if (target === Piece.Empty) {
        valid.push(to);
        continue;
      }

      if (!areSameColor(piece, target)) {
        valid.push(to);
      }

      hasBeenBlocked = true;
    }

    return valid.length ? new Uint8Array(valid) : new Uint8Array([EMPTY_MOVE]);
}

export function availableMoves(selectedPiece: Piece, selectedPos: number, lookupTables: MoveLookupTables, board: Board): Uint8Array {
    if (selectedPiece === Piece.Empty) return new Uint8Array([EMPTY_MOVE]);

    if (selectedPiece === Piece.Pawn) {
      const color = getPieceColor(
        board[selectedPos]
      );

      const moves = lookupTables.pawn.push[color][selectedPos];
      const captures = lookupTables.pawn.capture[color][selectedPos];

      return new Uint8Array([...moves, ...captures]);
    }

    if (selectedPiece === Piece.Knight || selectedPiece === Piece.King) return lookupTables.jumpSliding.get(selectedPiece)![selectedPos];

    const table = lookupTables.jumpSliding.get(selectedPiece);
    if (!table) {
      return new Uint8Array([EMPTY_MOVE]);
    }
    return getSlidingOrJumpingMoves(selectedPos, board[selectedPos], table, board);
}

export function canPawnMove(from: number, to: number, piece: Piece, target: Piece, board: Board) {
    const color = getPieceColor(piece);
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
      const startRow = getPieceColor(piece) === 0 ? 1 : 6;
      const intermediateSquare = from + direction * 8; // one square ahead

      if (
          rowDiff === 2 * direction &&
          fromRow === startRow &&
          target === Piece.Empty &&
          board[intermediateSquare] === Piece.Empty
      ) {
          return true;
      }

      return false;
    }

    //Diagonal
    if (colDiff === 1 && rowDiff === direction) {
      return (
        target !== Piece.Empty &&
        !areSameColor(piece, target)
      );
    }

    return false;
}

export function canMove(from: number, to: number, board: Board): boolean {
    const piece = board[from];
    const target = board[to];

    if (piece === Piece.Empty) return false;

    if (getPieceType(piece!) === Piece.Pawn) {
      return canPawnMove(from, to, piece!, target!, board);
    }

    return target === Piece.Empty || !areSameColor(piece!, target!);
}
import { Board } from '@common/game-architechture/board.type';
import { Piece } from '@common/game-architechture/piece.enum';
import { Injectable } from '@nestjs/common';

@Injectable()
export class BoardFactoryService {
    static createEmptyBoard(): Board {
        return new Uint8Array(64);
    }

    static createStartingPosition(): Board {
        const board = BoardFactoryService.createEmptyBoard();

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
}

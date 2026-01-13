import { Board } from "../game-architechture/board.type";
import { Color } from "../game-architechture/color.enum";

export interface Game {
    board: Board,
    turn: Color,

    kingPos: Uint8Array;

    isCheck: boolean,
    isCheckmate: boolean,
}
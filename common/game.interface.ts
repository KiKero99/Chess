import { Board } from "./board.type";
import { Color } from "./color.enum";

export interface Game {
    board: Board,
    turn: Color,
    isCheck: boolean,
    isCheckmate: boolean,
}
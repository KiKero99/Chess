import { Color } from "./color.enum";
import { Piece } from "./piece.enum";

export interface Player {
    id?: string,
    color?: Color,
    name: string,
    captured?: Piece[]
}
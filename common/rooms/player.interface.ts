import { Color } from "../game-architechture/color.enum";
import { Piece } from "../game-architechture/piece.enum";

export interface Player {
    id?: string,
    color?: Color,
    name: string,
    captured?: Piece[]
}
import { Game } from "./game.interface";
import { Player } from "./player.interface";

export interface Room {
    id: string,
    players: Player[]
    game: Game
}
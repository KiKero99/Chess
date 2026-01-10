import { Game } from "../rooms/game.interface";
import { Player } from "../rooms/player.interface";

export interface Room {
    id: string,
    players: Player[]
    game: Game
}
import { Player } from "./player.interface";

export interface JoinRequest {
    roomId: string, 
    player: Player
}
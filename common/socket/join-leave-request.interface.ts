import { Player } from "../rooms/player.interface";

export interface JoinLeaveRequest {
    roomId: string, 
    player: Player
}
import { Move } from "../game-architechture/movement-utils.functions";

export interface MoveRequest {
    move: Move,
    roomId: string,
}
import { Color } from '@common/game-architechture/color.enum';
import { MoveRequest } from '@common/rooms/move-request.interface';
import { Room } from '@common/rooms/room.interface';
import { Injectable } from '@nestjs/common';
import { getRandomIndex } from 'src/utils/logic.functions';
import { RoomManagerService } from '../room-manager/room-manager.service';
import { Player } from '@common/rooms/player.interface';
import { availableMoves, canMove, getPieceColor, getPieceType, moveFrom, moveTo } from '@common/game-architechture/movement-utils.functions';
import { lookupTables } from '@common/game-architechture/lookup-tables.const';
import { Piece } from '@common/game-architechture/piece.enum';

@Injectable()
export class GameManagerService {
    constructor(private readonly roomManager: RoomManagerService) {}

    intitializePlayers(room: Room) {
        const colors: Color[] = [Color.BLACK, Color.WHITE];
        for (const player of room.players) {
            player.captured = [];
            let colorIndex = getRandomIndex(colors.length);
            player.color = colors[colorIndex];
            colors.splice(colorIndex, 1);
        }
    }

    treatMoveRequest(moveRequest: MoveRequest, userId: string): Room {
        const room: Room |  undefined = this.roomManager.getRoom(moveRequest.roomId);
        if (!room) throw new Error("This room deosnt exists");
        const player: Player | undefined = this.getPlayerFromRoom(userId, room);
        if (!player) throw new Error("Player not in room");
        if (player.color !== room.game.turn) throw new Error("This is not your turn");

        const from: number = moveFrom(moveRequest.move);
        const to: number = moveTo(moveRequest.move);
        const available: Uint8Array = availableMoves(getPieceType(room.game.board[from]), from, lookupTables, room.game.board);
        if (!(available.includes(to) && canMove(from, to, room.game.board))) throw new Error("Move Not Valid");

        this.move(room, from, to, player);
        this.changeTurn(room);

        return room;
    }

    getPlayerFromRoom(userId: string, room: Room): Player | undefined {
        return room.players.find((player: Player) => {return player.id === userId});
    }

    changeTurn(room: Room) {
        room.game.turn ^= 1;
    }

    move(room: Room, from: number, to: number, player: Player) {
        const targetPiece = room.game.board[to];
        if (targetPiece !== Piece.Empty) player.captured?.push(targetPiece);
        const movingPiece = room.game.board[from];
        if (getPieceType(movingPiece) === Piece.King) room.game.kingPos[getPieceColor(movingPiece)] = to;
        room.game.board[to] = movingPiece;
        room.game.board[from] = Piece.Empty;
    }
}

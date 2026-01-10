import { Injectable } from '@nestjs/common';
import { Room } from '@common/rooms/room.interface';
import { Player } from '@common/rooms/player.interface';
import { MAX_ROOM_CODE_SIZE } from '@common/rooms/game.consts';
import { v4 as uuidv4 } from 'uuid';
import { GameFactoryService } from '../game-factory/game-factory.service';

@Injectable()
export class RoomFactoryService {
    static createRoom(player: Player): Room {
        return {
            id:  uuidv4().replaceAll(/\D/g, '').substring(0, MAX_ROOM_CODE_SIZE),
            players:[player],
            game: GameFactoryService.createGame()
        }
    }
}

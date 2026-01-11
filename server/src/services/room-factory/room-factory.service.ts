import { Injectable } from '@nestjs/common';
import { Room } from '@common/rooms/room.interface';
import { Player } from '@common/rooms/player.interface';
import { MAX_ROOM_CODE_SIZE } from '@common/rooms/game.consts';
import { GameFactoryService } from '../game-factory/game-factory.service';
import { getRandomId } from 'src/utils/logic.functions';

@Injectable()
export class RoomFactoryService {
    static createRoom(player: Player): Room {
        return {
            id: getRandomId(MAX_ROOM_CODE_SIZE, true),
            players:[player],
            game: GameFactoryService.createGame()
        }
    }
}

import { Game } from '@common/rooms/game.interface';
import { Injectable } from '@nestjs/common';
import { BoardFactoryService } from '../board-factory/board-factory.service';
import { Color } from '@common/game-architechture/color.enum';

@Injectable()
export class GameFactoryService {
    static createGame(): Game {
        return {
            board: BoardFactoryService.createStartingPosition(),
            turn: Color.WHITE,
            isCheck: false,
            isCheckmate: false
        }
    }
}

import { Game } from '@common/game.interface';
import { Injectable } from '@nestjs/common';
import { BoardFactoryService } from '../board-factory/board-factory.service';
import { Color } from '@common/color.enum';

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

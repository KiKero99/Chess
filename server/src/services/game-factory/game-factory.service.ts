import { Game } from '@common/rooms/game.interface';
import { Injectable } from '@nestjs/common';
import { BoardFactoryService } from '../board-factory/board-factory.service';
import { Color } from '@common/game-architechture/color.enum';
import { BLACK_KING_INITIAL_POS, WHITE_KING_INITIAL_POS } from '@common/game-architechture/game.const';

@Injectable()
export class GameFactoryService {
    static createGame(): Game {
        return {
            board: BoardFactoryService.createStartingPosition(),
            turn: Color.WHITE,
            kingPos: new Uint8Array([WHITE_KING_INITIAL_POS, BLACK_KING_INITIAL_POS]),
            isCheck: false,
            isCheckmate: false
        }
    }
}

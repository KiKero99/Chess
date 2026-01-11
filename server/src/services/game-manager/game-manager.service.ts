import { Color } from '@common/game-architechture/color.enum';
import { Room } from '@common/rooms/room.interface';
import { Injectable } from '@nestjs/common';
import { getRandomIndex } from 'src/utils/logic.functions';

@Injectable()
export class GameManagerService {
    intitializePlayers(room: Room) {
        const colors: Color[] = [Color.BLACK, Color.WHITE];
        for (const player of room.players) {
            player.captured = [];
            let colorIndex = getRandomIndex(colors.length);
            player.color = colors[colorIndex];
            colors.splice(colorIndex, 1);
        }
    }
}

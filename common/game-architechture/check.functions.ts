import { Game } from '../rooms/game.interface';

export function verifyCheck(game: Game) {
    
    game.isCheck = true;
}

export function verifyCheckMate(game: Game) {
    verifyCheck(game);
    if (!game.isCheck) return;
}

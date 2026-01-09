import { Injectable } from '@nestjs/common';
import { Room } from '@common/room.interface';
import { Player } from '@common/player.interface';

@Injectable()
export class RoomManagerServiceService {
    private readonly rooms: Map<string, Room> = new Map<string, Room>();

    getRoom(id: string): Room | undefined{
        return this.rooms.get(id);
    }

    setRoom(room: Room) {
        if (this.getRoom(room.id)) throw new Error("There exists already a room with this id");
        this.rooms.set(room.id, room);
    }

    addPlayerToRoom(id: string, player: Player) {
        const room: Room | undefined = this.getRoom(id);
        if (!room) throw new Error("This room does not exist");
        room.players.push(player);
    }

    deleteRoom(id: string) {
        this.rooms.delete(id);
    }
}

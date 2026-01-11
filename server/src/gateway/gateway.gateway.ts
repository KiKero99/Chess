import { Player } from '@common/rooms/player.interface';
import { Room } from '@common/rooms/room.interface';
import { JoinLeaveRequest } from '@common/socket/join-leave-request.interface';
import { CREATE_GAME_MESSAGE, GAME_CREATED_MESSAGE, JOIN_REQUEST_MESSAGE, ROOM_DOESNT_EXISTS_MESSAGE, GAME_STARTED_MESSAGE, LEAVE_ROOM_MESSAGE, PLAYER_LEFT_MESSAGE } from '@common/socket/socket-messages.consts';
import { SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { RoomFactoryService } from 'src/services/room-factory/room-factory.service';
import { RoomManagerService } from 'src/services/room-manager/room-manager.service';

@WebSocketGateway({ cors: true })
export class GatewayGateway {
  @WebSocketServer() private readonly server: Server;

  constructor(private readonly roomManager: RoomManagerService) {}

  @SubscribeMessage(CREATE_GAME_MESSAGE)
  createGame(client: Socket, player: Player) {
    const room: Room = RoomFactoryService.createRoom(player);
    this.roomManager.setRoom(room);
    client.join(room.id);
    client.emit(GAME_CREATED_MESSAGE, room.id);
  }

  @SubscribeMessage(JOIN_REQUEST_MESSAGE)
  joinGame(client: Socket, request: JoinLeaveRequest) {
    const room: Room | undefined = this.roomManager.getRoom(request.roomId)
    if (!room) {
      client.emit(ROOM_DOESNT_EXISTS_MESSAGE);
      return;
    }

    this.roomManager.addPlayerToRoom(request.roomId, request.player);
    client.join(room.id);
    this.server.to(room.id).emit(GAME_STARTED_MESSAGE, room.game);
  }

  @SubscribeMessage(LEAVE_ROOM_MESSAGE)
  leaveRoom(client: Socket, request: JoinLeaveRequest) {
    const room: Room | undefined = this.roomManager.getRoom(request.roomId);
    if (!room) {
      client.emit(ROOM_DOESNT_EXISTS_MESSAGE);
      return;
    }

    if (!room.players.some((player) => {return player.name === request.player.name})) {
      throw new Error("The player is not in the room");
    }

    this.roomManager.deleteRoom(request.roomId);
    this.server.to(request.roomId).emit(PLAYER_LEFT_MESSAGE);
    client.leave(request.roomId);
    
    //TODO delete all clients from room
  }
}

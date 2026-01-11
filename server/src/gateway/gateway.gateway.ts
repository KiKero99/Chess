import { Player } from '@common/rooms/player.interface';
import { Room } from '@common/rooms/room.interface';
import { JoinLeaveRequest } from '@common/socket/join-leave-request.interface';
import { CREATE_GAME_MESSAGE, GAME_CREATED_MESSAGE, JOIN_REQUEST_MESSAGE, ROOM_DOESNT_EXISTS_MESSAGE, GAME_STARTED_MESSAGE, LEAVE_ROOM_MESSAGE, PLAYER_LEFT_MESSAGE, PLAYER_INFO_MESSAGE } from '@common/socket/socket-messages.consts';
import { SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { GameManagerService } from 'src/services/game-manager/game-manager.service';
import { RoomFactoryService } from 'src/services/room-factory/room-factory.service';
import { RoomManagerService } from 'src/services/room-manager/room-manager.service';

@WebSocketGateway({ cors: true })
export class GatewayGateway {
  @WebSocketServer() private readonly server: Server;

  constructor(private readonly roomManager: RoomManagerService, private readonly gameManager: GameManagerService) {}

  @SubscribeMessage(CREATE_GAME_MESSAGE)
  createGame(client: Socket, player: Player) {
    player.id = client.id;
    const room: Room = RoomFactoryService.createRoom(player);
    this.roomManager.setRoom(room);
    client.join(room.id);
    client.emit(GAME_CREATED_MESSAGE, room.id);
  }

  @SubscribeMessage(JOIN_REQUEST_MESSAGE)
  joinGame(client: Socket, request: JoinLeaveRequest) {
    request.player.id = client.id;
    const room: Room | undefined = this.roomManager.getRoom(request.roomId)
    if (!room) {
      client.emit(ROOM_DOESNT_EXISTS_MESSAGE);
      return;
    }

    this.roomManager.addPlayerToRoom(request.roomId, request.player);
    client.join(room.id);
    this.gameManager.intitializePlayers(room);
    this.server.to(room.id).emit(GAME_STARTED_MESSAGE, room);
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

  private notifyPlayers(players: Player[], event: string) {
    for (const player of players) {
      this.server.to(player.id!).emit(event, player);
    }
  }
}
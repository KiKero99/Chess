import { Module } from '@nestjs/common';
import { GatewayGateway } from './gateway/gateway.gateway';
import { RoomFactoryService } from './services/room-factory/room-factory.service';
import { RoomManagerService } from './services/room-manager/room-manager.service';
import { GameFactoryService } from './services/game-factory/game-factory.service';
import { BoardFactoryService } from './services/board-factory/board-factory.service';

@Module({
  imports: [],
  controllers: [],
  providers: [GatewayGateway, RoomFactoryService, RoomManagerService, GameFactoryService, BoardFactoryService],
})
export class AppModule {}

import { Module } from '@nestjs/common';
import { AppController } from './controllers/app.controller';
import { AppService } from './services/app.service';
import { GatewayGateway } from './gateway/gateway.gateway';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, GatewayGateway],
})
export class AppModule {}

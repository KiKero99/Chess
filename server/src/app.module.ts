import { Module } from '@nestjs/common';
import { AppController } from './controllers/app.controller';
import { GatewayGateway } from './gateway/gateway.gateway';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [GatewayGateway],
})
export class AppModule {}

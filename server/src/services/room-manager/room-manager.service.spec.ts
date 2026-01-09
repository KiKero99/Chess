import { Test, TestingModule } from '@nestjs/testing';
import { RoomManagerServiceService } from './room-manager.service';

describe('RoomManagerServiceService', () => {
  let service: RoomManagerServiceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RoomManagerServiceService],
    }).compile();

    service = module.get<RoomManagerServiceService>(RoomManagerServiceService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

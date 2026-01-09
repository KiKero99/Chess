import { Test, TestingModule } from '@nestjs/testing';
import { BoardFactoryService } from './board-factory.service';

describe('BoardFactoryServiceService', () => {
  let service: BoardFactoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BoardFactoryService],
    }).compile();

    service = module.get<BoardFactoryService>(BoardFactoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

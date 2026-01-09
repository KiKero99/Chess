import { Test, TestingModule } from '@nestjs/testing';
import { BoardFactoryServiceService } from './board-factory.service';

describe('BoardFactoryServiceService', () => {
  let service: BoardFactoryServiceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BoardFactoryServiceService],
    }).compile();

    service = module.get<BoardFactoryServiceService>(BoardFactoryServiceService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

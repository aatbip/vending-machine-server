import { Test, TestingModule } from '@nestjs/testing';
import { FileSystemApiModule } from "./../../src/fileSystemApi/fileSystemApi.module"
import { CoreService } from './core.service';

describe('CoreService', () => {
  let service: CoreService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CoreService],
      imports: [FileSystemApiModule]
    }).compile();

    service = module.get<CoreService>(CoreService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getCurrentState', () => {
    it('should return current state and config', async () => {
      const result = await service.getCurrentState();
      expect(result.state).toBeDefined();
      expect(result.config).toBeDefined();
    });
  });

});



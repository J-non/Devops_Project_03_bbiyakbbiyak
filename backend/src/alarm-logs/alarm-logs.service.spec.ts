import { Test, TestingModule } from '@nestjs/testing';
import { AlarmLogsService } from './alarm-logs.service';

describe('AlarmLogsService', () => {
  let service: AlarmLogsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AlarmLogsService],
    }).compile();

    service = module.get<AlarmLogsService>(AlarmLogsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

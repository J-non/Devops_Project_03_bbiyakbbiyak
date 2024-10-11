import { Test, TestingModule } from '@nestjs/testing';
import { AlarmLogsController } from './alarm-logs.controller';
import { AlarmLogsService } from './alarm-logs.service';

describe('AlarmLogsController', () => {
  let controller: AlarmLogsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AlarmLogsController],
      providers: [AlarmLogsService],
    }).compile();

    controller = module.get<AlarmLogsController>(AlarmLogsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

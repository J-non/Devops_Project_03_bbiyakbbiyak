import { Controller } from '@nestjs/common';
import { AlarmLogsService } from './alarm-logs.service';

@Controller('alarm-logs')
export class AlarmLogsController {
  constructor(private readonly alarmLogsService: AlarmLogsService) {}
}

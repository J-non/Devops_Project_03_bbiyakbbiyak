import { Module } from '@nestjs/common';
import { AlarmLogsService } from './alarm-logs.service';
import { AlarmLogsController } from './alarm-logs.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { AlarmLogs } from './models/alarmLogs.model';
import { AlarmLogItems } from './models/alarmLogItemss';

@Module({
  imports: [
    SequelizeModule.forFeature([AlarmLogs, AlarmLogItems])
  ],
  controllers: [AlarmLogsController],
  providers: [AlarmLogsService],
})
export class AlarmLogsModule { }

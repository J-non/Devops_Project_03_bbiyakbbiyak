import { Module } from '@nestjs/common';
import { AlarmService } from './alarm.service';
import { AlarmController } from './alarm.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Alarms } from './models/alarms.model';
import { Days } from './models/days.model';
import { Items } from './models/items.model';
import { AlarmLogsService } from 'src/alarm-logs/alarm-logs.service';
import { AlarmLogs } from 'src/alarm-logs/models/alarmLogs.model';
import { AlarmLogItems } from 'src/alarm-logs/models/alarmLogItems.model';
import { ExpoPushTokens } from './models/expoPushTokens.model';
import { JwtService } from '@nestjs/jwt';
import { LoginModule } from 'src/login/login.module';
import { CommonModule } from 'src/common/common.module';

@Module({
  imports: [
    SequelizeModule.forFeature([Alarms, Days, Items, AlarmLogs, AlarmLogItems, ExpoPushTokens]),
    LoginModule,
    CommonModule
  ],
  controllers: [AlarmController],
  providers: [AlarmService, AlarmLogsService],
})
export class AlarmModule { }
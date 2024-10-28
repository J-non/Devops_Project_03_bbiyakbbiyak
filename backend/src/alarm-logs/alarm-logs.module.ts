import { Module } from '@nestjs/common';
import { AlarmLogsService } from './alarm-logs.service';
import { AlarmLogsController } from './alarm-logs.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { AlarmLogs } from './models/alarmLogs.model';
import { AlarmLogItems } from './models/alarmLogItems.model';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { SignupModule } from 'src/signup/signup.module';
import { LoginModule } from 'src/login/login.module';
import { CommonModule } from 'src/common/common.module';

@Module({
  imports: [
    SequelizeModule.forFeature([AlarmLogs, AlarmLogItems]),
    LoginModule,
    CommonModule
  ],
  controllers: [AlarmLogsController],
  providers: [AlarmLogsService],
})
export class AlarmLogsModule { }

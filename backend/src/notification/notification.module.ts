import { Module } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { NotificationController } from './notification.controller';
import { Alarms } from 'src/alarm/models/alarms.model';
import { SequelizeModule } from '@nestjs/sequelize';
import { CronService } from './cron.service';

@Module({
  imports: [SequelizeModule.forFeature([Alarms])], // 알람 모델 임포트
  controllers: [NotificationController],
  providers: [NotificationService, CronService], // 크론 서비스 제공 @@
})
export class NotificationModule { }

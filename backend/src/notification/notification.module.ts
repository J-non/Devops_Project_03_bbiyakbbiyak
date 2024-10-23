import { Module } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { NotificationController } from './notification.controller';
import { Alarms } from 'src/alarm/models/alarms.model';
import { SequelizeModule } from '@nestjs/sequelize';
import { CronService } from './cron.service';
import { ExpoPushTokens } from 'src/alarm/models/expoPushTokens.model';

@Module({
  imports: [SequelizeModule.forFeature([Alarms, ExpoPushTokens])], // 알람 모델 임포트
  controllers: [NotificationController],
  providers: [NotificationService, CronService], // 크론 서비스 제공 @@
})
export class NotificationModule { }

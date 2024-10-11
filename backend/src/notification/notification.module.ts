import { Module } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { NotificationController } from './notification.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Alarms } from './models/alarms.model';
import { Days } from './models/days.model';
import { Items } from './models/items.model';

@Module({
  imports: [
    SequelizeModule.forFeature([Alarms, Days, Items]),
  ],
  controllers: [NotificationController],
  providers: [NotificationService],
})
export class NotificationModule { }

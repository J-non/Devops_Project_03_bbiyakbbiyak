import { Module } from '@nestjs/common';
import { AlarmService } from './alarm.service';
import { AlarmController } from './alarm.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Alarms } from './models/alarms.model';
import { Days } from './models/days.model';
import { Items } from './models/items.model';

@Module({
  imports: [
    SequelizeModule.forFeature([Alarms, Days, Items]),
  ],
  controllers: [AlarmController],
  providers: [AlarmService],
})
export class AlarmModule { }

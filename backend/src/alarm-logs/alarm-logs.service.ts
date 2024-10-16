import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { AlarmLogItems } from './models/alarmLogItems.model';
import { AlarmLogs } from './models/alarmLogs.model';

@Injectable()
export class AlarmLogsService {
  constructor(
    @InjectModel(AlarmLogItems)
    private readonly AlarmLogItemsModel: typeof AlarmLogItems,
    @InjectModel(AlarmLogs)
    private readonly AlarmLogsModel: typeof AlarmLogs
  ) { }



  // 로그찍기 위한 데이터 가공 및 DB접근
  async createAlarmLogsFn(logStartDate, daysDifference, alarms, alarmDays, alarmItems) {
    for (let i = 0; i < daysDifference; i++) {
      const logDate = new Date(logStartDate.getTime() + (24 * 60 * 60 * 1000) * i);
      const formattedLogDate = logDate.toISOString().split('T')[0];
      const logDay = logDate.getDay();

      await Promise.all(alarms.map((alarm, j) => this.processAlarm(alarm, alarmDays[j], logDay, formattedLogDate, alarmItems[j], i)));
    }
  }
  async processAlarm(alarm, alarmDay, logDay, formattedLogDate, alarmItemData, dayIndex) {
    if (alarmDay.includes(logDay)) {
      const { targetTime, category } = alarm;

      // 알람 로그 생성
      const { dataValues: { id: logId } } = await this.AlarmLogsModel.create({
        logDate: formattedLogDate,
        targetTime,
        category
      });

      // 알람 아이템 생성
      await this.createAlarmLogItemsFn(logId, alarmItemData, dayIndex);
    }
  }
  async createAlarmLogItemsFn(logId, alarmItemData, dayIndex) {
    const itemPromises = alarmItemData.alarmItem.map((itemName, index) => {
      const isTaken = dayIndex === 0 ? alarmItemData.isTaken[index] : false;

      return this.AlarmLogItemsModel.create({
        itemName,
        isTaken,
        fk_alarmLogsId: logId
      });
    });

    await Promise.all(itemPromises);
  }



  // controller 호출 로직, 로그 찍기
  async createAlarmLogs(formattedLogData, daysDifference, loggedDate) {
    const { alarms, alarmDays, alarmItems } = formattedLogData
    const logStartDate = new Date(loggedDate);
    await this.createAlarmLogsFn(logStartDate, daysDifference, alarms, alarmDays, alarmItems);
  }

}











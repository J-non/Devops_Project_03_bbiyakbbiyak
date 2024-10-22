import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { AlarmLogItems } from './models/alarmLogItems.model';
import { AlarmLogs } from './models/alarmLogs.model';
import { Op } from 'sequelize';
import { Sequelize } from 'sequelize-typescript';
import { IFormatAlarmDays, IFormatAlarmItems, IFormatAlarms, IFormatLogData } from './dto/alarmLogs.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AlarmLogsService {
  constructor(
    @InjectModel(AlarmLogItems)
    private readonly AlarmLogItemsModel: typeof AlarmLogItems,
    @InjectModel(AlarmLogs)
    private readonly AlarmLogsModel: typeof AlarmLogs,
    private readonly jwtService: JwtService
  ) {
  }



  // 로그찍기 위한 데이터 가공 및 DB접근
  async createAlarmLogsFn(
    fk_userId: number,
    logStartDate: Date,
    daysDifference: number,
    alarms: IFormatAlarms[],
    alarmDays: IFormatAlarmDays[],
    alarmItems: IFormatAlarmItems[]
  ) {
    try {
      for (let i = 0; i < daysDifference; i++) {
        const logDate = new Date(logStartDate.getTime() + (24 * 60 * 60 * 1000) * i);
        const formattedLogDate = logDate.toISOString().split('T')[0];
        const logDay = logDate.getDay();

        await Promise.all(alarms.map((alarm, j) => this.processAlarm(fk_userId, alarm, alarmDays[j], logDay, formattedLogDate, alarmItems[j], i)));
      }

    } catch (error) {
      console.error(error)
    }
  }

  async processAlarm(fk_userId: number, alarm: IFormatAlarms, alarmDay, logDay, formattedLogDate: string, alarmItemData: IFormatAlarmItems, dayIndex: number) {
    try {
      if (alarmDay.includes(logDay)) {
        const { targetTime, category } = alarm;

        // 알람 로그 생성
        const { dataValues: { id: logId } } = await this.AlarmLogsModel.create({
          logDate: formattedLogDate,
          targetTime,
          category,
          fk_userId
        });

        // 알람 아이템 생성
        await this.createAlarmLogItemsFn(logId, alarmItemData, dayIndex);
      }
    } catch (error) {
      console.error(error)
    }
  }

  async createAlarmLogItemsFn(logId: number, alarmItemData: IFormatAlarmItems, dayIndex: number) {
    try {
      const itemPromises = alarmItemData.alarmItem.map((itemName, index) => {
        const isTaken = dayIndex === 0 ? alarmItemData.isTaken[index] : false;

        return this.AlarmLogItemsModel.create({
          itemName,
          isTaken,
          fk_alarmLogsId: logId,
        });
      });

      await Promise.all(itemPromises);
    } catch (error) {
      console.error(error);
    }
  }



  // alarms controller 호출 로직, 로그 찍기
  async createAlarmLogs(fk_userId: number, formattedLogData: IFormatLogData, daysDifference: number, loggedDate: string) {
    try {
      const { alarms, alarmDays, alarmItems } = formattedLogData
      const logStartDate = new Date(loggedDate);
      await this.createAlarmLogsFn(fk_userId, logStartDate, daysDifference, alarms, alarmDays, alarmItems);
    } catch (error) {
      console.error(error);
    }
  }



  // 선택된 날짜 로그 가져오기
  async selectAlarmLogsByUserId(fk_userId: number, category: string, logDate: string): Promise<AlarmLogs[]> {
    // const fk_userId = 1;
    const data = await this.AlarmLogsModel.findAll({
      where: { fk_userId, logDate, category },
      // where: { fk_userId, logDate },
      order: [['targetTime', 'ASC']],
      include: [AlarmLogItems]
    })
    if (!data) {
      throw new NotFoundException("일치하는 데이터 없음.");
    }
    return data
  }

  // 먹었는지 업데이트
  async updateAlarmLogItemsIsTaken(id: number, isTaken: boolean): Promise<[affectedCount: number]> {
    const data = await this.AlarmLogItemsModel.update({ isTaken }, { where: { id } });
    if (!data) {
      throw new NotFoundException("존재하지 않는 index로 접근하고 있습니다.");
    }
    return data
  }


  // 달력 dot찍기 요청
  async selectAlarmLogsByDate(fk_userId: number, monthString: string): Promise<AlarmLogs[]> {
    const subQuery = await this.AlarmLogsModel.findAll({
      attributes: [
        [Sequelize.fn('MAX', Sequelize.col('id')), 'id'] // 각 날짜의 최신 id를 가져옴
      ],
      where: {
        logDate: {
          [Op.like]: `${monthString}%` // YYYY-MM으로 시작하는 logDate
        },
        fk_userId // 필요한 경우 사용자 ID 필터링
      },
      group: ['logDate'], // logDate별로 그룹화
      raw: true // 쿼리 결과를 원시 값으로 반환
    });

    if (!subQuery) {
      throw new NotFoundException("일치하는 데이터 없음.");
    }

    // 서브쿼리에서 가져온 id들로 메인 쿼리 실행
    const data = await this.AlarmLogsModel.findAll({
      where: {
        id: {
          [Op.in]: subQuery.map(entry => entry.id) // 서브쿼리로부터 id를 추출하여 조건으로 사용
        }
      },
      order: [['logDate', 'ASC']] // logDate 기준으로 정렬
    });

    if (!data) {
      throw new NotFoundException("일치하는 데이터 없음.");
    }
    return data
  }
}











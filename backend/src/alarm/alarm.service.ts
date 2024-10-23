import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateAlarmDto } from './dto/create-alarm.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Alarms } from './models/alarms.model';
import { Days } from './models/days.model';
import { Items } from './models/items.model';
import { Sequelize } from 'sequelize-typescript';
import { IFormatLogData } from 'src/alarm-logs/dto/alarmLogs.dto';
import { ExpoPushTokens } from './models/expoPushTokens.model';


@Injectable()
export class AlarmService {
  constructor(
    @InjectModel(Alarms) private readonly alarmsModel: typeof Alarms,
    @InjectModel(Days) private readonly daysModel: typeof Days,
    @InjectModel(Items) private readonly itemsModel: typeof Items,
    @InjectModel(ExpoPushTokens) private readonly expoPushTokensModel: typeof ExpoPushTokens,
    private readonly sequelize: Sequelize
  ) { }

  //////////////////////////////// 유저 인덱스로 알람 읽기
  async getAlarmsByUserId(fk_userId: number): Promise<Alarms[]> {
    console.log(fk_userId)
    return this.alarmsModel.findAll({
      where: { fk_userId: fk_userId },
      include: [
        {
          model: Days,
          as: 'alarmDay',
          attributes: ['pushDay'],
        },
        {
          model: Items,
          as: 'alarmItem',
          attributes: ['itemName'],
        }
      ], order: [ // 배열의 순서대로 우선순위..
        ['targetTime', 'ASC'], // 시간 빠른 순서대로
        [{ model: Days, as: 'alarmDay' }, 'pushDay', 'ASC'], // 요일 빠른순서
      ]
    })
  }
  //////////////////////////////// 알람 등록
  async createAlarm(alarmData: CreateAlarmDto, fk_userId: number): Promise<Alarms> {
    const { category, targetTime, pushDay, itemName, pushMessage } = alarmData
    console.log(category, targetTime, pushDay, itemName, pushMessage)
    // 트랜잭션
    const transaction = await this.sequelize.transaction();
    try {
      const newAlarm = await this.alarmsModel.create(
        {
          category,
          targetTime,
          pushMessage,
          fk_userId,
          alarmDay: pushDay.map((el) => ({ pushDay: el })),
          alarmItem: itemName.map((el) => ({ itemName: el }))
        },
        { include: [Days, Items], transaction } // 트랜잭션 작업 내에서
      )
      await transaction.commit();
      return newAlarm
    } catch (error) {
      await transaction.rollback();
      throw new BadRequestException
    }
  }

  /////////////////////////////// 알람 수정
  async updateAlarm(alarmId: number, alarmData: CreateAlarmDto, fk_userId: number): Promise<Alarms> {
    const { category, targetTime, pushDay, itemName, pushMessage } = alarmData
    const transaction = await this.sequelize.transaction();
    try {
      const updateAlarm = await this.alarmsModel.findOne({ // 찾기
        where: { id: alarmId, fk_userId: fk_userId },
        include: [Days, Items],
        transaction,
      });
      updateAlarm.category = category,
        updateAlarm.targetTime = targetTime,
        updateAlarm.pushMessage = pushMessage
      await updateAlarm.save({ transaction }); // update해줌

      await this.daysModel.destroy({ where: { fk_alarmsId: updateAlarm.id }, force: true, transaction }) // 기존 컬럼 삭제
      const newDays = pushDay.map((el) => ({ pushDay: el, fk_alarmsId: updateAlarm.id })); // 새로 생성
      await this.daysModel.bulkCreate(newDays, { transaction }) // 여러개의 레코드를 삽입

      await this.itemsModel.destroy({ where: { fk_alarmsId: updateAlarm.id }, force: true, transaction })
      const newItems = itemName.map((el) => ({ itemName: el, fk_alarmsId: updateAlarm.id }))
      await this.itemsModel.bulkCreate(newItems, { transaction })

      await transaction.commit();
      return updateAlarm
    } catch (error) {
      await transaction.rollback();
      throw new BadRequestException
    }
  }
  /////////////////////////////// 알람 삭제
  async deleteAlarm(alarmId: number, fk_userId: number): Promise<number> {
    return await this.alarmsModel.destroy({ where: { id: alarmId, fk_userId: fk_userId }, force: true })
  }

  /////////////////////////////// 알람 토글
  async toggleAlarm(alarmId: number, fk_userId: number) {
    await this.alarmsModel.update(
      { isActive: Sequelize.literal('NOT isActive') }, // 현재 상태를 반전(literal 원시 SQL 구문을 Sequelize 쿼리에 직접 삽입)
      { where: { id: alarmId, fk_userId: fk_userId } }
    );
    return
  }

  ////////////////////// 토큰 저장
  async saveUserPushToken(userData: any) {
    console.log(userData)
    // const { userId, token } = userData
    try {
      return await this.expoPushTokensModel.create({
        fk_userId: userData.userId,
        deviceToken: userData.token
      })
    } catch (error) {
      return
    }
  }



  // main, log로직
  // 로그테이블 저장을 위한 가공
  formatLogData(data: any): IFormatLogData {
    try {
      const alarms = data.map((alarmsData: any) => {
        return {
          targetTime: alarmsData.dataValues.targetTime,
          category: alarmsData.dataValues.category,
          fk_userId: alarmsData.dataValues.fk_userId
        };
      });

      const alarmDaysTemp = data.map((alarmsData: any) => {
        return alarmsData.alarmDay

      })
      const alarmDays = alarmDaysTemp.map((alarmDayData: any) => {
        return alarmDayData.map((days: any) => {
          return days.dataValues.pushDay
        })

      })

      const alarmItemsTemp = data.map((alarmItemsData: any) => {
        return alarmItemsData.alarmItem
      })
      const alarmItems = alarmItemsTemp.map((alarmItemData: any) => {
        return {
          alarmItem: alarmItemData.map((items: any) => {
            return items.dataValues.itemName
          }),
          isTaken: alarmItemData.map((items: any) => {
            return items.dataValues.isTaken
          }),
        }
      })
      return { alarms, alarmDays, alarmItems }
    } catch (error) {
      console.error(error)
    }
  }

  // 로그 생성을 위한 데이터 조회
  async selectAlarmsByUserId(fk_userId: number): Promise<IFormatLogData> {
    // 토큰 복호화 로직 필요(userId)
    const data = await this.alarmsModel.findAll({ where: { fk_userId }, include: [Days, Items] })
    if (!data) {
      throw new NotFoundException("일치하는 데이터 없음.");
    }
    const formattedLogData = this.formatLogData(data)

    return formattedLogData
  }

  // 세부 알람 복용 여부 초기화
  async resetItemsIsTaken(fk_userId: number): Promise<[affectedCount: number]> {
    const alarmData = await this.alarmsModel.findAll({ attributes: ['id'], where: { fk_userId }, include: [Items] });
    if (!alarmData) {
      throw new NotFoundException("일치하는 데이터 없음.");
    }

    const itemIds = alarmData.flatMap(alarm =>
      alarm.alarmItem.map(item => item.id) // alarmItem 배열에서 각 item의 id 추출
    );


    const data = await this.itemsModel.update({ isTaken: false }, { where: { id: itemIds } });
    if (!data) {
      throw new BadRequestException("update query 실패.");
    }
    return data
  }
  // async resetItemsIsTaken(fk_userId: number) {
  //   const data = await this.itemsModel.update({ isTaken: false }, { where: { fk_userId } })
  //   return data
  // }

  // 알람 목록 가져오기
  async selectAlarmListByCategory(id: number, category: string, pushDay: number): Promise<Alarms[]> {
    const data = await this.alarmsModel.findAll({
      where: { fk_userId: id, category },
      order: [['targetTime', 'ASC']],
      include: [{ model: Days, where: { pushDay } }, Items]
    })
    if (!data) {
      throw new NotFoundException("일치하는 데이터 없음.");
    }
    return data
  }

  // 먹었는지 업데이트
  async updateItemsIsTaken(id: number, isTaken: boolean): Promise<[affectedCount: number]> {
    const data = await this.itemsModel.update({ isTaken }, { where: { id } });
    if (!data) {
      throw new NotFoundException("존재하지 않는 index로 접근하고 있습니다.");
    }
    return data
  }


}

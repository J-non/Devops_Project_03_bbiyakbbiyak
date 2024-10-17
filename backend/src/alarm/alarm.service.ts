import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateAlarmDto } from './dto/create-alarm.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Alarms } from './models/alarms.model';
import { Days } from './models/days.model';
import { Items } from './models/items.model';
import { Sequelize } from 'sequelize-typescript';


@Injectable()
export class AlarmService {
  constructor(
    @InjectModel(Alarms) private readonly alarmsModel: typeof Alarms,
    @InjectModel(Days) private readonly daysModel: typeof Days,
    @InjectModel(Items) private readonly itemsModel: typeof Items,
    private readonly sequelize: Sequelize
  ) { }

  //////////////////////////////// 유저 인덱스로 알람 읽기
  async getAlarmsByUserId(userId: number): Promise<Alarms[]> {
    console.log(userId)
    return this.alarmsModel.findAll({
      where: { fk_userId: userId },
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
  async createAlarm(alarmData: CreateAlarmDto): Promise<Alarms> {
    const { category, targetTime, pushDay, itemName, deviceToken, pushMessage, userIdFromToken } = alarmData
    // console.log(category, targetTime, pushDay, itemName, deviceToken, pushMessage, userIdFromToken)
    // 트랜잭션
    const transaction = await this.sequelize.transaction();
    try {
      const newAlarm = await this.alarmsModel.create(
        {
          category,
          targetTime,
          deviceToken,
          pushMessage,
          fk_userId: userIdFromToken,
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
  async updateAlarm(alarmId: number, alarmData: CreateAlarmDto): Promise<Alarms> {
    const { category, targetTime, pushDay, itemName, deviceToken, pushMessage, userIdFromToken } = alarmData
    const transaction = await this.sequelize.transaction();
    try {
      const updateAlarm = await this.alarmsModel.findOne({ // 찾기
        where: { id: alarmId, fk_userId: userIdFromToken },
        include: [Days, Items],
        transaction,
      });
      // console.log(updateAlarm)
      updateAlarm.category = category,
        updateAlarm.targetTime = targetTime,
        updateAlarm.pushMessage = pushMessage
      await updateAlarm.save({ transaction }); // update해줌

      await this.daysModel.destroy({ where: { fk_alarmsId: updateAlarm.id }, transaction }) // 기존 컬럼 삭제
      const newDays = pushDay.map((el) => ({ pushDay: el, fk_alarmsId: updateAlarm.id })); // 새로 생성
      await this.daysModel.bulkCreate(newDays, { transaction }) // 여러개의 레코드를 삽입

      await this.itemsModel.destroy({ where: { fk_alarmsId: updateAlarm.id }, transaction })
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
  async deleteAlarm(alarmId: number, userIdFromToken: number): Promise<number> {
    return await this.alarmsModel.destroy({ where: { id: alarmId, fk_userId: userIdFromToken }, force: true })
  }




  // main, log로직
  // 로그테이블 저장을 위한 가공
  formatLogData(data) {
    // console.log(data)
    // console.log(data[0].alarmDay)
    const alarms = data.map(alarmsData => {
      return {
        targetTime: alarmsData.dataValues.targetTime,
        category: alarmsData.dataValues.category,
        fk_userId: alarmsData.dataValues.fk_userId
      };
    });


    const alarmDaysTemp = data.map(alarmsData => {
      return alarmsData.alarmDay

    })

    const alarmDays = alarmDaysTemp.map(alarmDayData => {
      return alarmDayData.map((days) => {
        return days.dataValues.pushDay
      })

    })


    const alarmItemsTemp = data.map((alarmItemsData) => {
      return alarmItemsData.alarmItem
    })

    const alarmItems = alarmItemsTemp.map(alarmItemData => {
      return {
        alarmItem: alarmItemData.map((items) => {
          return items.dataValues.itemName
        }),
        isTaken: alarmItemData.map((items) => {
          return items.dataValues.isTaken
        }),
        fk_alarmsId: alarmItemData[0].dataValues.fk_alarmsId
      }
    })
    // console.log(alarms);
    // console.log(alarmDays)
    // console.log(alarmItems)
    // fk_alarmsId는 필요 없을지도? 순서 그대로 뽑아오는거라서?
    return { alarms, alarmDays, alarmItems }
  }

  // 로그 생성을 위한 데이터 조회
  async selectAlarmsByUserId(fk_userId: number) {
    // 토큰 복호화 로직 필요(userId)
    const data = await this.alarmsModel.findAll({ where: { fk_userId }, include: [Days, Items] })
    const formattedLogData = this.formatLogData(data)

    return formattedLogData
  }

  // 세부 알람 복용 여부 초기화
  async resetItemsIsTaken(fk_userId: number) {
    const data = await this.itemsModel.update({ isTaken: false }, { where: { fk_userId } })
    return data
  }

  // 알람 목록 가져오기
  async selectAlarmListByCategory(id: number, category: string, pushDay: number) {
    const data = await this.alarmsModel.findAll({
      where: { fk_userId: id, category },
      order: [['targetTime', 'ASC']],
      include: [{ model: Days, where: { pushDay } }, Items]
    })
    return data
  }

  // 먹었는지 업데이트
  async updateItemsIsTaken(id: number, isTaken: boolean) {
    const data = await this.itemsModel.update({ isTaken }, { where: { id } });
    if (!data) {
      throw new NotFoundException("존재하지 않는 index로 접근하고 있습니다.");
    }
    return data
  }

}

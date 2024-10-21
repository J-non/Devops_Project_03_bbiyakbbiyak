import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateAlarmDto } from './dto/create-alarm.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Alarms } from './models/alarms.model';
import { Days } from './models/days.model';
import { Items } from './models/items.model';
import { Sequelize } from 'sequelize-typescript';
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
  async getAlarmsByUserId(userId: number): Promise<Alarms[]> {
    // console.log(userId)
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
  async deleteAlarm(alarmId: number, userIdFromToken: number): Promise<number> {
    return await this.alarmsModel.destroy({ where: { id: alarmId, fk_userId: userIdFromToken }, force: true })
  }

  /////////////////////////////// 알람 토글
  async toggleAlarm(alarmId: number, userToken: number) {
    // console.log(alarmId, userToken)
    await this.alarmsModel.update(
      { isActive: Sequelize.literal('NOT isActive') }, // 현재 상태를 반전(literal 원시 SQL 구문을 Sequelize 쿼리에 직접 삽입)
      { where: { id: alarmId, fk_userId: userToken } }
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
}

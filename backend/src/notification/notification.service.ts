import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateNotificationDto } from './dto/create-alarm.dto';
import { UpdateNotificationDto } from './dto/update-alarm.dto';
import { Alarms } from './models/alarms.model';
import { InjectModel } from '@nestjs/sequelize';
import { Days } from './models/days.model';
import { Items } from './models/items.model';

@Injectable()
export class NotificationService {
  constructor(
    @InjectModel(Alarms)
    private readonly AlarmsModel: typeof Alarms,
    @InjectModel(Items)
    private readonly ItemsModel: typeof Items,
  ) { }

  create(createNotificationDto: CreateNotificationDto) {
    return 'This action adds a new notification';
  }

  findAll() {
    return `This action returns all notification`;
  }

  findOne(id: number) {
    return `This action returns a #${id} notification`;
  }

  update(id: number, updateNotificationDto: UpdateNotificationDto) {
    return `This action updates a #${id} notification`;
  }

  remove(id: number) {
    return `This action removes a #${id} notification`;
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
    const data = await this.AlarmsModel.findAll({ where: { fk_userId }, include: [Days, Items] })
    const formattedLogData = this.formatLogData(data)

    return formattedLogData
  }

  // 세부 알람 복용 여부 초기화
  async resetItemsIsTaken(fk_userId: number) {
    const data = await this.ItemsModel.update({ isTaken: false }, { where: { fk_userId } })
    return data
  }

  // 알람 목록 가져오기
  async selectAlarmListByCategory(id: number, category: string, pushDay: number) {
    const data = await this.AlarmsModel.findAll({
      where: { fk_userId: id, category },
      order: [['targetTime', 'ASC']],
      include: [{ model: Days, where: { pushDay } }, Items]
    })
    return data
  }

  // 먹었는지 업데이트
  async updateItemsIsTaken(id: number, isTaken: boolean) {
    const data = await this.ItemsModel.update({ isTaken }, { where: { id } });
    if (!data) {
      throw new NotFoundException("존재하지 않는 index로 접근하고 있습니다.");
    }
    return data
  }
}

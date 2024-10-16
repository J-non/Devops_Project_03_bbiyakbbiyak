import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { InjectModel } from '@nestjs/sequelize';
import { Alarms } from '../alarm/models/alarms.model';
import { Days } from '../alarm/models/days.model';
import { NotificationService } from './notification.service';

@Injectable()
export class CronService {
    constructor(
        @InjectModel(Alarms)
        private readonly alarmsModel: typeof Alarms, // 알람 모델 주입
        private readonly notificationService: NotificationService, // notification 서비스 주입
    ) { }


    // 매 분마다 실행
    // @Cron(CronExpression.EVERY_MINUTE)
    // async handleCron() {
    //     const now = new Date();
    //     // const currentTime = now.toTimeString().split(' ')[0]; // 'HH:MM:SS' 타임 변환
    //     const currentTime = '17:50:00'
    //     console.log(currentTime)
    //     // const currentWeekday = now.getDay(); // 요일 숫자 변환
    //     const currentWeekday = 3
    //     console.log(`크론 실행 - 현재 시간 ${currentTime}, 현재 요일 ${currentWeekday}`);

    //     try {
    //         // 현재 시간과 요일 맞는 알람 조회
    //         const alarms = await this.alarmsModel.findAll({
    //             where: { targetTime: currentTime },
    //             include: [
    //                 {
    //                     model: Days,
    //                     as: 'alarmDay',
    //                     where: { pushDay: currentWeekday },
    //                 },
    //             ],
    //         });
    //         console.log(alarms)

    //         console.log(`발견된 알람 개수: ${alarms.length}`);
    //         await Promise.all(
    //             alarms.map(alarm => this.notificationService.sendPushNotification(alarm))
    //         );
    //     } catch (error) {
    //         console.log(error)
    //     }
    // }
}
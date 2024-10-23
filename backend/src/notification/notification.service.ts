import { Injectable, } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import axios from 'axios';
import Expo from 'expo-server-sdk';
import { Alarms } from 'src/alarm/models/alarms.model';
import { ExpoPushTokens } from 'src/alarm/models/expoPushTokens.model';

@Injectable()
export class NotificationService {
  constructor(
    @InjectModel(ExpoPushTokens) private readonly expoPushTokensModel: typeof ExpoPushTokens
  ) { }

  async sendPushNotification(alarm: Alarms): Promise<void> { // 알람 한개임! 1번 알람
    const userId = alarm.fk_userId;

    // allDevices 사용자별 모든 푸시 토큰 조회 1번알람의 소유자의 모든 기기 조회
    const allDevices = await this.expoPushTokensModel.findAll({ where: { fk_userId: userId } });
    // pushTokens 해당알람 소유자 특정 아이디 유저의 디바이스들 토큰 배열 []

    // 유효한 Expo 푸시 토큰 필터링
    const validallDevicesTokens = allDevices.map(el => el.deviceToken).filter(el => Expo.isExpoPushToken(el)); // true만 반환

    // validPushTokens 은 ['ssdfasdfasdf','asdfasdfadsf','asdfadfsa']
    // 페이로드 구성 payload는 [{},{},{}] 한 알림에 보내야 할 페이로드 다중디바이스.
    const payloads = validallDevicesTokens.map(token => ({
      to: token,
      sound: 'default',
      title: '삐약삐약',
      body: alarm.pushMessage,
    }));

    try {
      const pushPromises = payloads.map(payload =>
        axios.post('https://exp.host/--/api/v2/push/send', payload, {
          headers: {
            'Content-Type': 'application/json',
          }
        })
      )
      const responses = await Promise.all(pushPromises);

      // // Expo Push Notification API에 POST 요청을 보내 알림 전송
      // await axios.post('https://exp.host/--/api/v2/push/send', payload, {
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      // });
      responses.forEach((response, index) => {
        console.log(`푸시 알림 전송 성공: Alarm ID ${alarm.id}, 디바이스: ${payloads[index].to}`);
      });
    } catch (error) {
      console.error(`푸시 알림 전송 실패: Alarm ID ${alarm.id}`);
    }
  }

}

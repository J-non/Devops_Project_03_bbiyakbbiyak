import { Injectable, Logger } from '@nestjs/common';
import axios from 'axios';
import { Alarms } from 'src/alarm/models/alarms.model';

@Injectable()
export class NotificationService {
  // private readonly expoPushUrl = 'https://exp.host/--/api/v2/push/send'

  async sendPushNotification(alarm: Alarms): Promise<void> {
    const pushToken = alarm.deviceToken; // 기기의 디바이스 토큰

    // Expo 푸시 토큰 형식 유효성 검사
    if (!this.isValidExpoPushToken(pushToken)) {
      // 유효하지 않은 토큰인 경우 알림 전송을 건너뜁니다.
      console.warn(`유효하지 않은 Expo 푸시 토큰: ${pushToken}`);
      return;
    }

    // 푸시 알림 페이로드
    const payload = {
      to: pushToken,
      sound: 'default', // 알림 소리
      body: alarm.pushMessage, // 알림 메시지 내용
    };

    try {
      // Expo Push Notification API에 POST 요청을 보내 알림 전송
      await axios.post('https://exp.host/--/api/v2/push/send', payload, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log(`푸시 알림 전송 성공: Alarm ID ${alarm.id}`);

    } catch (error) {
      console.error(`푸시 알림 전송 실패: Alarm ID ${alarm.id}`, error.response?.data || error.message);
    }

  }
  private isValidExpoPushToken(token: string): boolean {
    const regex = /^ExponentPushToken\[[0-9A-Za-z]+\]$/;
    return regex.test(token);
  }

}
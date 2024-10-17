import { Body, Controller, Post, Put, Query, Res } from '@nestjs/common';
import { AlarmLogsService } from './alarm-logs.service';
import { Response } from 'express';

@Controller('alarm-logs')
export class AlarmLogsController {
  constructor(private readonly alarmLogsService: AlarmLogsService) { }


  @Post('get_month_log')
  async getMonthLog() {
    try {

    } catch (error) {
      console.error(error)
    }
  }


  @Post('get_alarm_logs')
  async getAlarmLogs(@Query('category') category: string, @Query('logDate') logDate: string, @Res() res: Response) {
    try {
      // 유저 아이디 동적을 받는 로직 추가해야함
      console.log(logDate)
      const data = await this.alarmLogsService.selectAlarmLogsByUserId(1, category, logDate)
      res.send(data)
    } catch (error) {
      console.error(error)
    }
  }


  @Put('alarm_log_Items/is_taken')
  async updateAlarmLogItemsIsTaken(@Body() body: any, @Res() res: Response) {
    try {
      console.log(123123)
      const { id, isTaken } = body;
      console.log(id, isTaken)
      const data = await this.alarmLogsService.updateAlarmLogItemsIsTaken(id, isTaken);
      res.send(data);
    } catch (error) {
      console.error(error)
    }
  }
}

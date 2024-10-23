import { Body, Controller, Get, Post, Put, Query, Req, Res, UseGuards } from '@nestjs/common';
import { AlarmLogsService } from './alarm-logs.service';
import { Request, Response } from 'express';
import { TokenGuard } from 'src/common/guard/login.guard';
import { Payload } from 'src/common/decorator/payload.decorator';

@Controller('alarm-logs')
export class AlarmLogsController {
  constructor(private readonly alarmLogsService: AlarmLogsService) { }


  // 헤더에 유저토큰 가져오기 및 타입지정 해야함
  @Get('get_month_log')
  @UseGuards(TokenGuard)
  async getMonthLog(@Payload('id') fk_userId: number, @Query('monthString') monthString: string, @Res() res: Response) {
    try {
      const data = await this.alarmLogsService.selectAlarmLogsByDate(fk_userId, monthString);
      res.send(data);
    } catch (error) {
      console.error(error)
    }
  }

  // 헤더에 유저토큰 가져오기 및 타입지정 해야함
  @Get('get_alarm_logs')
  @UseGuards(TokenGuard)
  async getAlarmLogs(@Payload('id') fk_userId: number, @Query('category') category: string, @Query('logDate') logDate: string, @Res() res: Response) {
    try {
      // 유저 아이디 동적을 받는 로직 추가해야함
      const data = await this.alarmLogsService.selectAlarmLogsByUserId(fk_userId, category, logDate)
      res.send(data)
    } catch (error) {
      console.error(error)
    }
  }

  // 헤더에 유저토큰 가져오기 및 타입지정 해야함????
  @Put('alarm_log_Items/is_taken')
  @UseGuards(TokenGuard)
  async updateAlarmLogItemsIsTaken(@Body() body: { id: number, isTaken: boolean }, @Res() res: Response) {
    try {
      const { id, isTaken } = body;
      const data = await this.alarmLogsService.updateAlarmLogItemsIsTaken(id, isTaken);
      res.send(data);
    } catch (error) {
      console.error(error)
    }
  }
}

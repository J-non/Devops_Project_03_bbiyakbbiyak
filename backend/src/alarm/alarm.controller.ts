import { Controller, Post, Body, Put, Get, Query, Param, Delete, Header, Req, Res, UseGuards } from '@nestjs/common';
import { AlarmService } from './alarm.service';
import { CreateAlarmDto } from './dto/create-alarm.dto';
import { AlarmLogsService } from 'src/alarm-logs/alarm-logs.service';
import { Response } from 'express';
import { TokenGuard } from 'src/common/guard/login.guard';
import { Payload } from 'src/common/decorator/payload.decorator';

@Controller('alarm')
export class AlarmController {
  constructor(
    private readonly alarmService: AlarmService,
    private readonly alarmLogsService: AlarmLogsService
  ) { }

  ////////////////////// 알람 조회 (유저아이디)
  @UseGuards(TokenGuard)
  @Get('getall')
  async getAllAlarmsByUserId(@Payload('id') fk_userId: number) {
    return await this.alarmService.getAlarmsByUserId(fk_userId);
  }

  ////////////////////// 알람 등록
  @UseGuards(TokenGuard)
  @Post('register')
  async createAlarm(@Body() alarmData: CreateAlarmDto, @Payload('id') fk_userId: number) {
    return await this.alarmService.createAlarm(alarmData, fk_userId)
  }

  ////////////////////// 알람 수정
  @UseGuards(TokenGuard)
  @Put('update/:alarmId')
  async updateAlarm(@Param('alarmId') alarmId: number, @Body() alarmData: CreateAlarmDto, @Payload('id') fk_userId: number) {
    return await this.alarmService.updateAlarm(alarmId, alarmData, fk_userId)
  }

  ////////////////////// 알람 삭제
  @UseGuards(TokenGuard)
  @Delete('delete/:alarmId')
  async deleteAlarm(@Param('alarmId') alarmId: number, @Payload('id') fk_userId: number) {
    return await this.alarmService.deleteAlarm(alarmId, fk_userId)
  }

  ////////////////////// 토글 요청
  @UseGuards(TokenGuard)
  @Put('toggle/:alarmId')
  async toggleAlarm(@Param('alarmId') alarmId: number, @Payload('id') fk_userId: number) {
    console.log(12312312312312312)
    console.log(alarmId)
    console.log(fk_userId)
    return await this.alarmService.toggleAlarm(alarmId, fk_userId)
  }

  ////////////////////// 토큰 저장
  @Post('savepushtoken')
  async saveUserPushToken(@Body() userData: any) { // 유저 인덱스 유저 토큰으로 가져아ㅗ야함
    return await this.alarmService.saveUserPushToken(userData)
  }




  // main, log로직
  // log찍기
  @Post('create_logs/:id')
  async createLogs(@Param('id') id: any, @Body() body, @Res() res: Response) {
    try {
      const { daysDifference, loggedDate } = body;
      const formattedLogData = await this.alarmService.selectAlarmsByUserId(id);
      await this.alarmLogsService.createAlarmLogs(id, formattedLogData, daysDifference, loggedDate)
      await this.alarmService.resetItemsIsTaken(id)
      res.end();
    } catch (error) {
      console.error(error)
    }
  }

  // 알람 목록 조회
  // 유저 id동적으로 받아오는 처리 해야함
  @Get('get_alarm_list')
  async getAlarmListByCategory(@Query('category') category: string, @Query('pushDay') pushDay: number, @Res() res: Response) {
    try {
      // 유저 id동적으로 받아오는 처리 해야함
      const data = await this.alarmService.selectAlarmListByCategory(1, category, pushDay)
      res.send(data)
    } catch (error) {
      console.error(error)
    }
  }

  // 먹었는지 여부 업데이트
  @Put('items/is_takend')
  async updateItemsIstaken(@Body() body: any, @Res() res: Response) {
    try {
      const { id, isTaken } = body;
      const data = await this.alarmService.updateItemsIsTaken(id, isTaken);
      res.send(data);
    } catch (error) {
      console.error(error)
    }


  }
}
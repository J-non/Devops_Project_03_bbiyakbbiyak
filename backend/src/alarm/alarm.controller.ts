import { Controller, Post, Body, Put, Get, Query, Param, Delete } from '@nestjs/common';
import { AlarmService } from './alarm.service';
import { CreateAlarmDto } from './dto/create-alarm.dto';

@Controller('alarm')
export class AlarmController {
  constructor(private readonly alarmService: AlarmService) { }

  ////////////////////// 알람 조회 (유저아이디)
  @Post('getall')
  async getAllAlarmsByUserId(@Body('userId') userId: any) {
    return await this.alarmService.getAlarmsByUserId(userId);
  }

  ////////////////////// 알람 등록
  @Post('register')
  async createAlarm(@Body() alarmData: CreateAlarmDto) {
    return await this.alarmService.createAlarm(alarmData)
  }

  ////////////////////// 알람 수정
  @Put('update/:alarmId')
  async updateAlarm(@Param('alarmId') alarmId: number, @Body() alarmData: CreateAlarmDto) {
    return await this.alarmService.updateAlarm(alarmId, alarmData)
  }

  ////////////////////// 알람 삭제
  @Delete('delete/:alarmId')
  async deleteAlarm(@Param('alarmId') alarmId: number, @Body('userIdFromToken') userIdFromToken: any) {
    return await this.alarmService.deleteAlarm(alarmId, userIdFromToken)
  }

}

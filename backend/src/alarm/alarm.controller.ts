import { Controller, Post, Body, Put, Get, Query, Param, Delete, Header, Req } from '@nestjs/common';
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

  ////////////////////// 토글 요청
  @Put('toggle/:alarmId')
  async toggleAlarm(@Param('alarmId') alarmId: number, @Req() req: Request, @Body('userToken') userToken: number) {
    console.log(alarmId)
    console.log(userToken)
    // console.log(req.headers.authorized)
    return await this.alarmService.toggleAlarm(alarmId, userToken)
  }

  ////////////////////// 토큰 저장
  @Post('savepushtoken')
  async saveUserPushToken(@Body() userData: any) { // 유저 인덱스 유저 토큰으로 가져아ㅗ야함
    return await this.alarmService.saveUserPushToken(userData)
  }

}

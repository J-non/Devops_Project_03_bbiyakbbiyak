import { Controller, Post, Body, Put, Get, Query, Param, Delete, Res } from '@nestjs/common';
import { AlarmService } from './alarm.service';
import { CreateAlarmDto } from './dto/create-alarm.dto';
import { AlarmLogsService } from 'src/alarm-logs/alarm-logs.service';
import { Response } from 'express';

@Controller('alarm')
export class AlarmController {
  constructor(
    private readonly alarmService: AlarmService,
    private readonly alarmLogsService: AlarmLogsService
  ) { }

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
  // @Post('get_alarm_list')
  // async getAlarmListByCategory(@Query('category') category: string, @Query('pushDay') pushDay: number, @Res() res: Response) {
  //   try {
  //     // 유저 id동적으로 받아오는 처리 해야함
  //     const data = await this.alarmService.selectAlarmListByCategory(1, category, pushDay)
  //     res.send(data)
  //   } catch (error) {
  //     console.error(error)
  //   }
  // }
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

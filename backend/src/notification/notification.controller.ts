import { Controller, Get, Post, Body, Patch, Param, Delete, Res, Put, Query } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { CreateNotificationDto } from './dto/create-alarm.dto';
import { UpdateNotificationDto } from './dto/update-alarm.dto';
import { Response } from 'express';
import { AlarmLogsService } from 'src/alarm-logs/alarm-logs.service';

@Controller('notification')
export class NotificationController {
  constructor(
    private readonly notificationService: NotificationService,
    private readonly alarmLogsService: AlarmLogsService
  ) { }

  @Post('register')
  registerNotification(@Body() body: any) {
    console.log('controller')
  }







  // @Post()
  // create(@Body() createNotificationDto: CreateNotificationDto) {
  //   return this.notificationService.create(createNotificationDto);
  // }

  // @Get()
  // findAll() {
  //   return this.notificationService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.notificationService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateNotificationDto: UpdateNotificationDto) {
  //   return this.notificationService.update(+id, updateNotificationDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.notificationService.remove(+id);
  // }






  // main, log로직
  // log찍기
  @Post('create_logs/:id')
  async createLogs(@Param('id') id: any, @Body() body, @Res() res: Response) {
    try {
      const { daysDifference, loggedDate } = body;
      const formattedLogData = await this.notificationService.selectAlarmsByUserId(id);
      await this.alarmLogsService.createAlarmLogs(id, formattedLogData, daysDifference, loggedDate)
      await this.notificationService.resetItemsIsTaken(id)
      res.end();
    } catch (error) {
      console.error(error)
    }
  }

  // 알람 목록 조회
  // 유저 id동적으로 받아오는 처리 해야함
  @Post('get_alarm_list')
  async getAlarmListByCategory(@Query('category') category: string, @Query('pushDay') pushDay: number, @Res() res: Response) {
    try {
      // 유저 id동적으로 받아오는 처리 해야함
      const data = await this.notificationService.selectAlarmListByCategory(1, category, pushDay)
      res.send(data)
    } catch (error) {
      console.error(error)
    }
  }
  // @Get('get_alarm_list')
  // async getAlarmListByCategory(@Query('category') category: any, @Res() res: Response) {
  //   try {
  //     // 유저 id동적으로 받아오는 처리 해야함
  //     const data = await this.notificationService.selectAlarmListByCategory(1, category)
  //     res.send(data)
  //   } catch (error) {
  //     console.error(error)
  //   }
  // }

  // 먹었는지 여부 업데이트
  @Put('items/is_takend')
  async updateItemsIstaken(@Body() body: any, @Res() res: Response) {
    try {
      const { id, isTaken } = body;
      console.log(id, isTaken)
      const data = await this.notificationService.updateItemsIsTaken(id, isTaken);
      res.send(data);
    } catch (error) {
      console.error(error)
    }
  }

}

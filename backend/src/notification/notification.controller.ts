import { Controller, Get, Post, Body, Patch, Param, Delete, Res, Put, Query } from '@nestjs/common';
import { NotificationService } from './notification.service';

@Controller('notification')
export class NotificationController {
  constructor(
    private readonly notificationService: NotificationService,
  ) { }


}

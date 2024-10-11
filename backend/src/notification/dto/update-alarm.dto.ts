import { PartialType } from '@nestjs/swagger';
import { CreateNotificationDto } from './create-alarm.dto';

export class UpdateNotificationDto extends PartialType(CreateNotificationDto) { }

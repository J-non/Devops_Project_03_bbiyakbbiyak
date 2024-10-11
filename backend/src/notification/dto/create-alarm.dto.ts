export class CreateNotificationDto { }


///////////////////// 알람 생성 DTO //////////////////////
export class CreateAlarmDto {
    category: string
    targetTime: Date
    selectedDays: string[]
    alarmContent: string[]
}

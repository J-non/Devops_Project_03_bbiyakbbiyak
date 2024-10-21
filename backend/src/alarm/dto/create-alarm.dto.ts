///////////////////// 알람 생성 DTO //////////////////////
export class CreateAlarmDto {
    category: string
    targetTime: string
    pushDay: string[]
    itemName: string[]
    deviceToken: string
    pushMessage: string
    userIdFromToken: number
}

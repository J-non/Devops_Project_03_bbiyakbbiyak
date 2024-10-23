interface IFormatLogData {
  alarms: IFormatAlarms[];
  alarmDays: IFormatAlarmDays[];
  alarmItems: IFormatAlarmItems[];
}

interface IFormatAlarms {
  targetTime: string;
  category: 'etc' | 'drink' | 'medicine';
  fk_userId: number;
}

interface IFormatAlarmDays {
  alarmDays: (0 | 1 | 2 | 3 | 4 | 5 | 6)[];
}

interface IFormatAlarmItems {
  alarmItem: string[];
  isTaken: boolean[];
}

export { IFormatLogData, IFormatAlarms, IFormatAlarmDays, IFormatAlarmItems }
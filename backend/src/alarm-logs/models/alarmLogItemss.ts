import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { AlarmLogs } from "./alarmLogs.model";

@Table({
  tableName: 'alarmLogDetails',
  timestamps: true
})
export class AlarmLogItems extends Model {
  @Column({
    type: DataType.STRING(10),
    allowNull: false
  })
  itemName: string

  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
    defaultValue: false
  })
  isTaken: boolean

  @Column({
    type: DataType.INTEGER,
    allowNull: false
  })
  itemsid: number

  @ForeignKey(() => AlarmLogs)
  @Column
  fk_alarmLogsId: number

  @BelongsTo(() => AlarmLogs)
  alarmLogs: AlarmLogs
}
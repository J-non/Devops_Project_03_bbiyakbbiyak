import { BelongsTo, Column, DataType, ForeignKey, HasMany, Model, Table } from "sequelize-typescript";
import { AlarmLogItems } from "./alarmLogItemss";

@Table({
  tableName: 'alarmLogs',
  timestamps: true
})
export class AlarmLogs extends Model {
  @Column({
    type: DataType.STRING(10)
  })
  date: string;

  @Column({
    type: DataType.STRING(8),
  })
  time: string;

  @Column({
    type: DataType.STRING(20),
    allowNull: false
  })
  category: string

  // @ForeignKey(() => Users)
  // @Column
  // fk_usersId: number

  // @BelongsTo(()=> Users)
  // users: Users

  @HasMany(() => AlarmLogItems, {
    sourceKey: 'id',
    foreignKey: 'fk_alarmLogsId',
    onDelete: 'cascade'
  })
  alarmLogItems: AlarmLogItems[]
}
import { BelongsTo, Column, DataType, ForeignKey, HasMany, Model, Table } from "sequelize-typescript";
import { AlarmLogItems } from "./alarmLogItems.model";

@Table({
  tableName: 'alarmLogs',
  timestamps: true
})
export class AlarmLogs extends Model {
  @Column({
    type: DataType.STRING(10)
  })
  logDate: string;

  @Column({
    type: DataType.STRING(8),
  })
  targetTime: string;

  @Column({
    type: DataType.STRING(20),
    allowNull: false
  })
  category: string

  // @ForeignKey(() => Users)
  // @Column
  // fk_userId: number

  // @BelongsTo(()=> Users)
  // users: Users

  @Column({
    type: DataType.INTEGER,
    allowNull: false
  })
  fk_userId: number

  @HasMany(() => AlarmLogItems, {
    sourceKey: 'id',
    foreignKey: 'fk_alarmLogsId',
    onDelete: 'cascade'
  })
  alarmLogItems: AlarmLogItems[]
}
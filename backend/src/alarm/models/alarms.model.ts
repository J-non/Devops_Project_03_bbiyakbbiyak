import { BelongsTo, Column, DataType, ForeignKey, HasMany, Model, Table } from "sequelize-typescript";
import { Days } from "./days.model";
import { Items } from "./items.model";
import { userSignUp } from "src/model/user.model";

@Table({
  tableName: 'alarms',
  timestamps: true,
})

export class Alarms extends Model {
  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  category: string

  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  targetTime: string

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  pushMessage: string;

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: true,
  })
  isActive: boolean

  @HasMany(() => Days, {
    foreignKey: 'fk_alarmsId',
    onDelete: 'CASCADE'
  })
  alarmDay: Days[];

  @HasMany(() => Items, {
    foreignKey: 'fk_alarmsId',
    onDelete: 'CASCADE'
  })
  alarmItem: Items[];


  @ForeignKey(() => userSignUp)
  @Column
  fk_userId: number

  @BelongsTo(() => userSignUp)
  users: userSignUp

}

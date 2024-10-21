import { BelongsTo, Column, DataType, ForeignKey, HasMany, Model, Table } from "sequelize-typescript";
import { Days } from "./days.model";
import { Items } from "./items.model";

@Table({
  tableName: 'alarms',
  timestamps: true,
  paranoid: true
})

export class Alarms extends Model {
  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  category: string

  @Column({
    type: DataType.TIME,
    allowNull: false
  })
  targetTime: string

  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  deviceToken: string

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


  // 임시
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  fk_userId: number


  // 등록 유저 id

  // @ForeignKey(() => User)
  // @Column
  // fk_registId: number

  // @BelongsTo(() => User, "fk_registId")
  // registId: User;


}

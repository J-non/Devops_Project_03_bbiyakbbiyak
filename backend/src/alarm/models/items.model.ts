import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { Alarms } from "./alarms.model";

@Table({
  tableName: 'items',
  timestamps: true,
  paranoid: true,
})

export class Items extends Model {
  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  itemName: string

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
  })
  isTaken: boolean


  @ForeignKey(() => Alarms)
  @Column
  fk_alarmsId: number

  @BelongsTo(() => Alarms, "fk_alarmsId")
  alarms: Alarms



  //  유저 foreignKey 필요
  // 먹었는지 여부 일괄 업데이트 시 필요함
  // @Column({
  //   type: DataType.INTEGER,
  //   allowNull: false
  // })
  // fk_userId: number
}
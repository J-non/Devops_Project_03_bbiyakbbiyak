import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { Alarms } from "./alarms.model";

@Table({
    tableName: 'days',
    timestamps: true,
})

export class Days extends Model {
    @Column({
        type: DataType.INTEGER,
        allowNull: false
    })
    pushDay: number


    @ForeignKey(() => Alarms)
    @Column
    fk_alarmsId: number

    @BelongsTo(() => Alarms, "fk_alarmsId")
    alarms: Alarms
}
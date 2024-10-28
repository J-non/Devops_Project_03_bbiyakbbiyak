import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { userSignUp } from "src/model/user.model";

@Table({
    tableName: 'pushTokens',
    timestamps: true,
})

export class ExpoPushTokens extends Model {
    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    deviceToken: string

    @ForeignKey(() => userSignUp)
    @Column
    fk_userId: number

    @BelongsTo(() => userSignUp)
    users: userSignUp
}
import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";

@Table({
    tableName: 'pushTokens',
    timestamps: true,
    paranoid: true
})

export class ExpoPushTokens extends Model {
    @Column({
        type: DataType.STRING,
        allowNull: false,
        unique: true
    })
    deviceToken: string

    // 임시
    @Column({
        type: DataType.INTEGER,
        allowNull: false
    })
    fk_userId: number
}
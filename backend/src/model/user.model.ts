import { Column, DataType, Default, HasMany, Model, Table } from 'sequelize-typescript';
import { AlarmLogs } from 'src/alarm-logs/models/alarmLogs.model';
import { Alarms } from 'src/alarm/models/alarms.model';

@Table({
  tableName: 'userDB',
  timestamps: true,
  paranoid: false,
})
export class userSignUp extends Model {
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  email: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  password: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  userName: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  phone: string;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
  })
  isOAuthUser: boolean;

  @Default(false)
  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
  })
  isAlreadyUser: false;

  @HasMany(() => AlarmLogs, {
    foreignKey: 'fk_userId',
    onDelete: 'CASCADE'
  })
  alarmLogs: AlarmLogs[];


  @HasMany(() => Alarms, {
    foreignKey: 'fk_userId',
    onDelete: 'CASCADE'
  })
  alarms: Alarms[];
}

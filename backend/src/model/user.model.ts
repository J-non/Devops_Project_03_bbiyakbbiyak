import { Column, DataType, Model, Table } from 'sequelize-typescript';

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
}

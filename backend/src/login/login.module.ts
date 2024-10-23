import { Module } from '@nestjs/common';
import { LoginService } from './login.service';
import { LoginController } from './login.controller';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { SequelizeModule } from '@nestjs/sequelize';
import { userSignUp } from 'src/model/user.model';
import { CommonModule } from 'src/common/common.module';


@Module({
  imports: [
    SequelizeModule.forFeature([userSignUp]),
    // JwtModule
    CommonModule
  ],
  controllers: [LoginController],
  providers: [LoginService],
  exports: [LoginService],
})
export class LoginModule { }

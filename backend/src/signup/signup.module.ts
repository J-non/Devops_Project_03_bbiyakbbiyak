import { Module } from '@nestjs/common';
import { SignupService } from './signup.service';
import { SignupController } from './signup.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { userSignUp } from 'src/model/user.model';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { CommonModule } from 'src/common/common.module';

@Module({
  imports: [
    SequelizeModule.forFeature([userSignUp]),
    CommonModule
  ],
  controllers: [SignupController],
  providers: [SignupService]
})
export class SignupModule { }

import { Module } from '@nestjs/common';
import { SignupService } from './signup.service';
import { SignupController } from './signup.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { userSignUp } from 'src/model/user.model';
import { CommonModule } from 'src/common/common.module';
import { LoginModule } from 'src/login/login.module';

@Module({
  imports: [
    SequelizeModule.forFeature([userSignUp]),
    LoginModule,
    CommonModule
  ],
  controllers: [SignupController],
  providers: [SignupService]
})
export class SignupModule { }

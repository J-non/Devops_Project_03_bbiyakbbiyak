import { Module } from '@nestjs/common';
import { SignupService } from './signup.service';
import { SignupController } from './signup.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { userSignUp } from 'src/model/user.model';

@Module({
  imports: [SequelizeModule.forFeature([userSignUp])],
  controllers: [SignupController],
  providers: [SignupService],
})
export class SignupModule {}

import { Module } from '@nestjs/common';
import { SignupService } from './signup.service';
import { SignupController } from './signup.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { userSignUp } from 'src/model/user.model';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    SequelizeModule.forFeature([userSignUp]),
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        const secret = config.get<string>('JWT_SECRET');
        return {
          secret,
          signOptions: { expiresIn: '1y' },
        };
      },
    }),
  ],
  controllers: [SignupController],
  providers: [SignupService],
})
export class SignupModule {}

import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { LoginModule } from './login/login.module';
import { SignupModule } from './signup/signup.module';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { LoginService } from './login/login.service';
import { APP_FILTER } from '@nestjs/core';
import { ExceptionHandler } from './Exception/ExceptionHandler';

@Module({
  imports: [
    LoginModule,
    SignupModule,
    ConfigModule.forRoot({ isGlobal: true }),
    SequelizeModule.forRoot({
      dialect: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'test',
      autoLoadModels: true,
      synchronize: true,
      sync: { force: false },
    }),
  ],
  controllers: [AppController],
  providers: [AppService, ExceptionHandler],
})
export class AppModule {}

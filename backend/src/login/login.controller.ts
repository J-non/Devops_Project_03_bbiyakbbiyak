import {
  Controller,
  Post,
  Body,
  Res,
  UseFilters,
  Param,
  Get,
  Req,
  Query,
} from '@nestjs/common';
import { LoginService } from './login.service';
import { CreateLoginDto } from './dto/create-login.dto';
import { Request, Response } from 'express';
import { ExceptionHandler } from 'src/Exception/ExceptionHandler';

@Controller('login')
export class LoginController {
  constructor(private readonly loginService: LoginService) {}

  @Post()
  @UseFilters(new ExceptionHandler())
  async create(@Body() createLoginDto: CreateLoginDto, @Res() res: Response) {
    const data = await this.loginService.create(createLoginDto);
    const message = '로그인 되셨습니다.';
    res.send({ data, message });
  }

  @Post('findID')
  @UseFilters(new ExceptionHandler())
  async findID(@Body() searchID: CreateLoginDto, @Res() res: Response) {
    const data = await this.loginService.findUserID(searchID);

    res.send(data);
  }

  @Post('findPW')
  @UseFilters(new ExceptionHandler())
  async findPW(@Body() searchPW: CreateLoginDto, @Res() res: Response) {
    const data = await this.loginService.findUserPW(searchPW);

    res.send(data);
  }

  @Post('updatePW')
  @UseFilters(new ExceptionHandler())
  async updatePW(@Body() searchPW: CreateLoginDto, @Res() res: Response) {
    const data = await this.loginService.updatePW(searchPW);
    const message = '비밀번호 변경이 완료되었습니다.';

    res.send({ data, message });
  }

  @Get('getInfo/:id')
  @UseFilters(new ExceptionHandler())
  async getInfo(@Param() param: CreateLoginDto, @Res() res: Response) {
    console.log(param);
    const data = await this.loginService.verifyOAuth(param);

    res.send(data);
  }

  @Post('getInfo/updateGoogle')
  @UseFilters(new ExceptionHandler())
  async updateGoogle(
    @Body() updateGoogle: CreateLoginDto,
    @Res() res: Response,
  ) {
    console.log(updateGoogle);
    const data = await this.loginService.updateGoogle(updateGoogle);
    res.send(data);
  }
}

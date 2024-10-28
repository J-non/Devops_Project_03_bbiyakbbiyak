import {
  Controller,
  Post,
  Body,
  Res,
  UseFilters,
  Param,
  Get,
  UsePipes,
} from '@nestjs/common';
import { LoginService } from './login.service';
import { CreateLoginDto } from './dto/create-login.dto';
import { Request, Response } from 'express';
import { ExceptionHandler } from 'src/Exception/ExceptionHandler';
import { LoginPipe } from 'src/common/pipe/signup.pipe';

@Controller('login')
export class LoginController {
  constructor(private readonly loginService: LoginService) { }

  @Post()
  @UsePipes(LoginPipe)
  @UseFilters(new ExceptionHandler())
  async create(@Body() createLoginDto: CreateLoginDto, @Res() res: Response) {
    const data = await this.loginService.create(createLoginDto);
    const message = '로그인 되셨습니다.';
    res.send({ data, message });
  }

  @Post('findID')
  @UseFilters(new ExceptionHandler())
  async findID(@Body() searchID: CreateLoginDto, @Res() res: Response) {
    const data = await this.loginService.findUserID(searchID, res);
  }

  @Post('findPW')
  @UseFilters(new ExceptionHandler())
  async findPW(@Body() searchPW: CreateLoginDto, @Res() res: Response) {
    const data = await this.loginService.findUserPW(searchPW, res);
  }

  @Post('NavigationPw')
  @UseFilters(new ExceptionHandler())
  async NavigationPw(@Body() searchPW: CreateLoginDto, @Res() res: Response) {
    const data = await this.loginService.navigationPw(searchPW, res);
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
    const data = await this.loginService.verifyOAuth(param);

    res.send(data);
  }

  @Post('getInfo/updateGoogle')
  @UseFilters(new ExceptionHandler())
  async updateGoogle(
    @Body() updateGoogle: CreateLoginDto,
    @Res() res: Response,
  ) {
    const data = await this.loginService.updateGoogle(updateGoogle);
    res.send(data);
  }
}

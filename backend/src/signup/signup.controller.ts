import { Controller, Post, Body, Res, Req, UseFilters } from '@nestjs/common';
import { SignupService } from './signup.service';
import { CreateEmail, CreateSignupDto } from './dto/create-signup.dto';
import { Request, Response, response } from 'express';
import { ExceptionHandler } from 'src/Exception/ExceptionHandler';

@Controller('signup')
export class SignupController {
  constructor(private readonly signupService: SignupService) {}

  @Post()
  async signup(
    @Body() createSignupDto: CreateSignupDto,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    const data = await this.signupService.create(createSignupDto);
    res.send({ data });
  }

  @Post('google')
  async signupGoogle(@Body() createGoogle: any, @Res() res: Response) {
    const data = await this.signupService.createGoogle(createGoogle, res);

    res.send('회원가입이 완료되셨습니다.');
  }

  @Post('authCode')
  @UseFilters(new ExceptionHandler())
  async getMailVerified(@Body() isEmail: CreateEmail, @Res() res: Response) {
    // isEmail에서 이메일 값이 들어오는데 db에 같은 이메일 있는지 확인하기@@@@@@@@@@@@@@
    const result = await this.signupService.emailAuth(isEmail, res);
  }
}

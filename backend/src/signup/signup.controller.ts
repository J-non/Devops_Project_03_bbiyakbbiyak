import {
  Controller,
  Post,
  Body,
  Res,
  Req,
  UseFilters,
  UsePipes,
} from '@nestjs/common';
import { SignupService } from './signup.service';
import { CreateEmail, CreateSignupDto } from './dto/create-signup.dto';
import { Request, Response } from 'express';
import { ExceptionHandler } from 'src/Exception/ExceptionHandler';
import { SignUpPipe } from 'src/common/pipe/signup.pipe';

@Controller('signup')
export class SignupController {
  constructor(private readonly signupService: SignupService) { }

  @Post()
  @UsePipes(SignUpPipe)
  @UseFilters(new ExceptionHandler())
  async signup(@Body() createSignupDto: CreateSignupDto, @Res() res: Response) {
    const data = await this.signupService.create(createSignupDto);
    res.send({ data });
  }

  @Post('google')
  async signupGoogle(@Body() createGoogle: any, @Res() res: Response) {
    await this.signupService.createGoogle(createGoogle, res);
  }

  @Post('authCode')
  @UseFilters(new ExceptionHandler())
  async getMailVerified(
    @Body() isVerifyCode: CreateEmail,
    @Res() res: Response,
  ) {
    // isEmail에서 이메일 값이 들어오는데 db에 같은 이메일 있는지 확인하기@@@@@@@@@@@@@@
    const result = await this.signupService.verifyAuth(isVerifyCode, res);
  }

  @Post('jwtToken')
  async getToken(@Body() isUserInfo: CreateSignupDto, @Res() res: Response) {
    const result = await this.signupService.createJwtToken(isUserInfo);

    res.send(result);
  }

  @Post('deleteUser')
  async deleteUser(@Res() res: Response, @Req() req: Request) {
    const { authorization } = req.headers;
    await this.signupService.deleteUser(authorization);

    res.send({ message: '회원 탈퇴 되셨습니다.', isDeleted: true });
  }
}

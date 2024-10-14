import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateEmail, CreateSignupDto } from './dto/create-signup.dto';
import * as bcrypt from 'bcrypt';
import { generateRandomNumber, smtpTransport } from 'src/config/email';
import { Response, response } from 'express';
import { InjectModel } from '@nestjs/sequelize';
import { userSignUp } from 'src/model/user.model';

@Injectable()
export class SignupService {
  constructor(
    @InjectModel(userSignUp)
    private readonly userSignupLogic: typeof userSignUp,
  ) {}
  async create(createSignupDto: CreateSignupDto) {
    const { data } = createSignupDto;
    const { email, userName, phone } = data;

    const salt = 10;
    const plainPassword = createSignupDto.data.password;
    const hashedPassword = await bcrypt.hash(plainPassword, salt); // 비밀번호 암호화
    this.userSignupLogic.create({
      email,
      password: hashedPassword,
      userName,
      phone: phone,
      isOAuthUser: false,
    });
    return '회원가입이 완료 되셨습니다.';
  }

  async createGoogle(createGoogle: CreateSignupDto, res: Response) {
    const { name, email } = createGoogle.data;

    const isGoogleEmailSignedUp = await this.userSignupLogic.findOne({
      where: { email: email },
    });

    if (isGoogleEmailSignedUp) {
      if (isGoogleEmailSignedUp.email === email) {
        throw new HttpException(
          '소셜 로그인 유저입니다.',
          HttpStatus.BAD_REQUEST,
        );
      }
    }

    return await this.userSignupLogic.create({
      email,
      userName: name,
      phone: '',
      password: '',
      isOAuthUser: true,
    });
  }

  async emailAuth(createEmailNum: CreateEmail, res: any) {
    const number = generateRandomNumber(111111, 999999);

    const isUserSignedIn = await this.userSignupLogic.findOne({
      where: {
        email: createEmailNum.data,
      },
    });

    if (isUserSignedIn) {
      if (isUserSignedIn.email === createEmailNum.data)
        throw new HttpException(
          '이미 가입한 아이디가 존재합니다.',
          HttpStatus.BAD_REQUEST,
        );
    }

    const mailOptions = {
      from: 'dkswndgus0506@naver.com',
      to: createEmailNum.data,
      subject: '약 알람 bbiyakbbiyak 앱 회원 인증 관련 이메일입니다.',
      html: '<h1>인증번호를 입력해주세요 \n\n\n\n\n\n</h1>' + number,
    };

    smtpTransport.sendMail(mailOptions, (err: any, info: any) => {
      if (err) {
        console.log('Error:', err);
        return res.json({ ok: false, msg: '메일 전송에 실패하였습니다.' });
      } else {
        console.log('Email sent: ', info.response);
        return res.json({
          ok: true,
          msg: '메일 전송에 성공하셨습니다.',
          authNum: number,
        });
      }
    });
  }
}

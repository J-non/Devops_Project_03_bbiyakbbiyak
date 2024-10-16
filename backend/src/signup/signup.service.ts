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
import { SolapiMessageService } from 'solapi';

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
      console.log(isGoogleEmailSignedUp);
      const result = {
        ...createGoogle.data,
        name: isGoogleEmailSignedUp.userName,
        isAlreadyUser: true,
      };
      res.send(result);
      return;
    }

    const newUser = await this.userSignupLogic.create({
      email,
      userName: name,
      phone: '',
      password: '',
      isOAuthUser: true,
    });
    res.send(newUser);
  }

  async verifyAuth(createAuthNum: CreateEmail, res: any) {
    const number = generateRandomNumber(111111, 999999);
    if (createAuthNum.data.type === 'email') {
      const isUserSignedIn = await this.userSignupLogic.findOne({
        where: {
          email: createAuthNum.data.email,
        },
      });

      if (isUserSignedIn) {
        if (isUserSignedIn.email === createAuthNum.data.email)
          throw new HttpException(
            '이미 가입한 아이디가 존재합니다.',
            HttpStatus.BAD_REQUEST,
          );
      }

      const mailOptions = {
        from: 'dkswndgus0506@naver.com',
        to: createAuthNum.data.email,
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
            type: '이메일 인증',
            msg: '메일 전송에 성공하셨습니다.',
            authNum: number,
          });
        }
      });
    }

    if (createAuthNum.data.type === 'phone') {
      const isUserSignedIn = await this.userSignupLogic.findOne({
        where: {
          email: createAuthNum.data.phone,
        },
      });

      if (isUserSignedIn) {
        if (isUserSignedIn.phone === createAuthNum.data.phone)
          throw new HttpException(
            '이미 가입한 아이디가 존재합니다.',
            HttpStatus.BAD_REQUEST,
          );
      }

      const apiKey = process.env.SOLAPI_API;
      const apiSecret = process.env.SOLAPI_API_SECRET;
      const messageService = new SolapiMessageService(apiKey, apiSecret);

      const message = {
        // 문자 내용 (최대 2,000Bytes / 90Bytes 이상 장문문자)
        text: `[삐약삐약] 인증번호 [${number}]`,
        // 수신번호 (문자 받는 이)
        to: createAuthNum.data.phone,
        // 발신번호 (문자 보내는 이)
        from: '01023682587',
      };

      messageService
        .sendOne(message)
        .then(
          res.json({
            ok: true,
            type: '핸드폰 인증',
            msg: '인증코드 발송을 성공하셨습니다.',
            authNum: number,
          }),
        )
        .catch(
          res.json({
            ok: false,
            msg: '인증코드 전송에 실패하였습니다.',
          }),
        );
    }
  }
}

import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateLoginDto } from './dto/create-login.dto';
import { JwtService } from '@nestjs/jwt';
import { userSignUp } from 'src/model/user.model';
import { InjectModel } from '@nestjs/sequelize';
import * as bcrypt from 'bcryptjs';
import { SolapiMessageService } from 'solapi';
import { generateRandomNumber, smtpTransport } from 'src/config/email';
import { Response } from 'express';

@Injectable()
export class LoginService {
  constructor(
    @InjectModel(userSignUp)
    private readonly userLoginLogic: typeof userSignUp,
    private jwtService: JwtService,
  ) { }

  async create(createLoginDto: CreateLoginDto) {
    const { email, password } = createLoginDto.data;

    const user = await this.validateUser(email, password);

    const payload = {
      id: user.id,
      email: user.email,
      phone: user.phone,
      isOAuthUser: user.isOAuthUser,
    };


    return {
      access_token: this.jwtService.sign(payload)
    };
  }

  async validateUser(email: string, password: string) {
    const isUserVerified = await this.userLoginLogic.findOne({
      where: { email: email },
    });

    if (!isUserVerified) {
      throw new HttpException(
        '이메일 및 비밀번호를 확인해주세요.',
        HttpStatus.BAD_REQUEST,
      );
    }

    const isMatch = await bcrypt.compare(password, isUserVerified.password);

    if (!isMatch) {
      throw new HttpException(
        '이메일 및 비밀번호를 확인해주세요.',
        HttpStatus.BAD_REQUEST,
      );
    }

    return isUserVerified;
  }

  async findID(searchID: CreateLoginDto) {
    return await this.userLoginLogic.findOne({
      where: { email: searchID },
    });
  }

  async findUserID(searchID: CreateLoginDto, res: any) {
    const { phone } = searchID.data;
    const result = await this.userLoginLogic.findOne({
      where: { phone: phone },
    });

    if (result === null) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        ok: false,
        msg: '찾을 수 없는 아이디입니다.',
      });
    }

    const number = generateRandomNumber(111111, 999999);

    const apiKey = process.env.SOLAPI_API;
    const apiSecret = process.env.SOLAPI_API_SECRET;
    const messageService = new SolapiMessageService(apiKey, apiSecret);

    const message = {
      text: `[삐약삐약] 인증번호 [${number}]`,
      to: phone,
      from: process.env.DEVELOP_PHONE,
    };

    try {
      await messageService.sendOne(message);
      return res.json({
        ok: true,
        type: '핸드폰 인증',
        msg: '인증코드 발송을 성공하셨습니다.',
        authNum: number,
        result: result.email,
      });
    } catch (error) {
      console.error(error);
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        ok: false,
        msg: '인증코드 전송에 실패하였습니다.',
      });
    }
  }

  async findUserPW(searchID: CreateLoginDto, res: any) {
    const { email, phone, type } = searchID.data;
    const result = await this.userLoginLogic.findOne({
      where: { email: email, phone: phone },
    });

    if (!result) {
      throw new HttpException(
        '찾을 수 없는 요청입니다.',
        HttpStatus.BAD_REQUEST,
      );
    }

    if (result.isOAuthUser === true) {
      throw new HttpException('소셜로그인 유저입니다.', HttpStatus.BAD_REQUEST);
    }

    const number = generateRandomNumber(111111, 999999);

    try {
      if (type === 'phone') {
        const apiKey = process.env.SOLAPI_API;
        const apiSecret = process.env.SOLAPI_API_SECRET;
        const messageService = new SolapiMessageService(apiKey, apiSecret);

        const message = {
          text: `[삐약삐약] 인증번호 [${number}]`,
          to: phone,
          from: process.env.DEVELOP_PHONE,
        };

        // 비동기 호출을 대기하고, 성공 여부를 체크
        await messageService.sendOne(message);

        return res.json({
          ok: true,
          type: '핸드폰 인증',
          msg: '인증코드 발송을 성공하셨습니다.',
          authNum: number,
          result: result.phone,
        });
      }

      if (type === 'email') {
        const mailOptions = {
          from: 'dkswndgus0506@naver.com',
          to: email,
          subject: '약 알람 bbiyakbbiyak 앱 회원 인증 관련 이메일입니다.',
          html: '<h1>인증번호를 입력해주세요 \n\n\n\n\n\n</h1>' + number,
        };

        // 비동기 호출을 대기하고, 성공 여부를 체크
        await smtpTransport.sendMail(mailOptions);

        return res.json({
          ok: true,
          type: '이메일 인증',
          msg: '메일 전송에 성공하셨습니다.',
          authNum: number,
        });
      }
    } catch (error) {
      // 오류가 발생하면 catch 블록에서 한 번만 응답 처리
      return res.json({
        ok: false,
        msg: '인증코드 전송에 실패하였습니다.',
        error: error.message, // 에러 메시지를 추가적으로 전달 가능
      });
    }
  }

  async navigationPw(navigationPw: CreateLoginDto, res: any) {
    const { email, phone } = navigationPw.data;

    const result = await this.userLoginLogic.findOne({
      where: {
        email: email,
        phone: phone,
      },
    });

    if (!result) {
      throw new HttpException(
        '찾을 수 없는 요청입니다.',
        HttpStatus.BAD_REQUEST,
      );
    }

    return result;
  }

  async updatePW(updatePW: CreateLoginDto) {
    const { password } = updatePW.data.update;

    const salt = 10;
    const plainPassword = password;
    const hashedPassword = await bcrypt.hash(plainPassword, salt); // 비밀번호 암호화

    return await this.userLoginLogic.update(
      { password: hashedPassword },
      { where: { email: updatePW.data.param } },
    );
  }

  async verifyOAuth(verifyUser: CreateLoginDto) {
    const { id } = verifyUser;
    let email;

    const isJwtToken = id.split('.').length === 3;
    if (isJwtToken) {
      try {
        const token = id;
        const cleanedToken = token.replace(/^["']|["']$/g, '');
        const verifiedToken = await this.jwtService.verify(cleanedToken);
        email = verifiedToken.email;
      } catch (error) {
        throw new HttpException(
          '토큰이 유효하지 않습니다.',
          HttpStatus.BAD_REQUEST,
        );
      }
    } else {
      email = id;
    }

    const result = await this.userLoginLogic.findOne({
      where: { email: email },
    });

    return result;
  }

  async updateGoogle(updateGoogleUserName: CreateLoginDto) {
    let data;
    if (
      updateGoogleUserName.data.password !==
      updateGoogleUserName.data.rePassword
    ) {
      throw new HttpException(
        '비밀번호가 일치하지 않습니다.',
        HttpStatus.BAD_REQUEST,
      );
    }

    if (updateGoogleUserName.data.isOAuthUser === false) {
      const salt = 10;
      const plainPassword = updateGoogleUserName.data.password;
      const hashedPassword = await bcrypt.hash(plainPassword, salt); // 비밀번호 암호화
      data = await this.userLoginLogic.update(
        {
          userName: updateGoogleUserName.data.userName,
          password: hashedPassword,
        },
        { where: { email: updateGoogleUserName.data.email } },
      );

      const payload = { email: updateGoogleUserName.data.email };

      return await this.jwtService.sign(payload);
    } else {
      await this.userLoginLogic.update(
        { userName: updateGoogleUserName.data.userName },
        { where: { email: updateGoogleUserName.data.email } },
      );
      data = '업데이트 되셨습니다.';
      return data;
    }
  }
}

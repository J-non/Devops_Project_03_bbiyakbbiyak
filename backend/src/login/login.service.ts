import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateLoginDto } from './dto/create-login.dto';
import { JwtService } from '@nestjs/jwt';
import { userSignUp } from 'src/model/user.model';
import { InjectModel } from '@nestjs/sequelize';
import * as bcrypt from 'bcrypt';
import { SolapiMessageService } from 'solapi';
import { generateRandomNumber } from 'src/config/email';
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
      throw new HttpException(
        '찾을 수 없는 아이디입니다.',
        HttpStatus.BAD_REQUEST,
      );
    }
    const number = generateRandomNumber(111111, 999999);

    const apiKey = process.env.SOLAPI_API;
    const apiSecret = process.env.SOLAPI_API_SECRET;
    const messageService = new SolapiMessageService(apiKey, apiSecret);

    const message = {
      // 문자 내용 (최대 2,000Bytes / 90Bytes 이상 장문문자)
      text: `[삐약삐약] 인증번호 [${number}]`,
      // 수신번호 (문자 받는 이)
      to: phone,
      // 발신번호 (문자 보내는 이)
      from: process.env.DEVELOP_PHONE,
    };

    messageService
      .sendOne(message)
      .then(
        res.json({
          ok: true,
          type: '핸드폰 인증',
          msg: '인증코드 발송을 성공하셨습니다.',
          authNum: number,
          result: result.email,
        }),
      )
      .catch(
        res.json({
          ok: false,
          msg: '인증코드 전송에 실패하였습니다.',
        }),
      );
  }

  async findUserPW(searchID: CreateLoginDto) {
    const { email, phone } = searchID.data;
    const result = await this.userLoginLogic.findOne({
      where: { email: email, phone: phone },
    });

    if (!result) {
      throw new HttpException(
        '찾을 수 없는 요청입니다.',
        HttpStatus.BAD_REQUEST,
      );
    }

    if (result.isOAuthUser === true)
      throw new HttpException('소셜로그인 유저입니다.', HttpStatus.BAD_REQUEST);

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

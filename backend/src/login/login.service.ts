import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateLoginDto } from './dto/create-login.dto';
import { JwtService } from '@nestjs/jwt';
import { userSignUp } from 'src/model/user.model';
import { InjectModel } from '@nestjs/sequelize';
import * as bcrypt from 'bcrypt';

@Injectable()
export class LoginService {
  constructor(
    @InjectModel(userSignUp)
    private readonly userLoginLogic: typeof userSignUp,
    private jwtService: JwtService,
  ) {}

  async create(createLoginDto: CreateLoginDto) {
    const { email, password } = createLoginDto.data;

    const user = await this.validateUser(email, password);

    const payload = { email: email };

    return {
      access_token: this.jwtService.sign(payload),
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

  async findUserID(searchID: CreateLoginDto) {
    const { email } = searchID.data;
    const result = await this.userLoginLogic.findOne({
      where: { email: email },
    });
    console.log(result);
    if (result === null) {
      throw new HttpException(
        '찾을 수 없는 아이디입니다.',
        HttpStatus.BAD_REQUEST,
      );
    }

    return result.email;
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
}

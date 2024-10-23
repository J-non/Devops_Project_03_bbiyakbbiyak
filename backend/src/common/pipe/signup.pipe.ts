import {
  ArgumentMetadata,
  BadRequestException,
  PipeTransform,
} from '@nestjs/common';

export class SignUpPipe implements PipeTransform {
  name: string = null;
  constructor(name: string) {
    this.name = name;
  }
  transform(value: any, metadata: ArgumentMetadata) {
    if (!value || typeof value !== 'object') {
      throw new BadRequestException('Invalid input format.');
    }

    const { email, password } = value.data;

    if (!email || !password) {
      throw new BadRequestException('아이디 또는 비밀번호를 잘 입력해줘');
    }

    if (/^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,15}$/.test(password)) {
      console.log('비밀번호 한글 제외, 영문자,숫자,특수문자 1개이상 포함');
      if (
        password.length >= (this.name || 8) &&
        password.length <= (this.name || 15)
      ) {
        console.log('비밀번호 값이 8자 이상, 15자 이하로 잘 적었습니다.');
        return value;
      } else {
        throw new BadRequestException(
          `비밀번호를 최소 8자이상, 최대 15자까지 써줘`,
        );
      }
    } else {
      throw new BadRequestException(
        `비밀번호를 한글제외, 영문자,숫자,특수문자 포함 1개 이상으로 써줘`,
      );
    }
  }
}

export class LoginPipe implements PipeTransform {
  private readonly minLength: number;
  private readonly maxLength: number;

  constructor(minLength: number = 0, maxLength: number = 999999) {
    this.minLength = minLength;
    this.maxLength = maxLength;
  }

  transform(value: any, metadata: ArgumentMetadata) {
    if (!value || typeof value !== 'object') {
      throw new BadRequestException('Invalid input format.');
    }

    const { email, password } = value.data;

    if (!email || !password) {
      throw new BadRequestException('아이디 또는 비밀번호를 잘 입력해줘');
    }

    // Validate `email` if needed
    if (email.length < 2 || email.length > this.maxLength) {
      // Adjust length as necessary
      throw new BadRequestException(`email는 최소 2자, 최대 15자까지 써줘`);
    }

    // Validate `password`
    const isValidFormat =
      /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,15}$/.test(password);
    if (!isValidFormat) {
      throw new BadRequestException(
        `${password} must contain at least one letter, one number, and one special character.`,
      );
    }

    if (password.length < this.minLength || password.length > 60) {
      throw new BadRequestException(
        `${password} must be between ${this.minLength} and ${this.maxLength} characters.`,
      );
    }

    return value;
  }
}

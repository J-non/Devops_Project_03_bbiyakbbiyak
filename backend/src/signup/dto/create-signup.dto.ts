export class CreateSignupDto {
  data: any;
  email: string; // 나중에 email로 바꿔야됨
  password: string;
  userName: string;
  phone: string | number;
  name: string;
}

export class CreateEmail {
  data: string;
}

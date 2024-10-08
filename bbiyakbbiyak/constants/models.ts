export const valueType = {
  id: "id",
  password: "password",
  nickName: "nickName",
  rePassword: "rePassword",
} as const;

export interface RegistrationData {
  id: string;
  password: string;
  nickName: string;
}

export type Valuetype = keyof typeof valueType;

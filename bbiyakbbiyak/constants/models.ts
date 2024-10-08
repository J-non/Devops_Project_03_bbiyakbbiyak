export const valueType = {
  id: "id",
  password: "password",
  nickname: "nickname",
  rePassword: "rePassword",
} as const;

export interface RegistrationData {
  id: string;
  password: string;
  nickname: string;
}

export type Valuetype = keyof typeof valueType;

import { UseMutationResult } from "@tanstack/react-query";

export const valueType = {
  email: "email",
  password: "password",
  userName: "userName",
  rePassword: "rePassword",
  phone: "phone",
  name: "name",
} as const;

export interface RegistrationData {
  id: string;
  password: string;
  userName: string;
}

export type Valuetype = keyof typeof valueType;

interface MutationData {
  ok: boolean;
  msg: string;
  authNum: string;
}

export interface MutationProps {
  mutation: UseMutationResult<MutationData, Error, string>;
}

export interface TabListType {
  children: React.ReactNode;
  onPress: () => void;
}

export type RootStackParamList = {
  signupScreen: undefined;
  findID: undefined;
  findPW: undefined;
  changePW: { data: string };
  Unlogin: undefined;
  Logined: undefined;
  OtherMenuMain: undefined;
  ManageAlarm: undefined;
  MyPage: undefined;
};

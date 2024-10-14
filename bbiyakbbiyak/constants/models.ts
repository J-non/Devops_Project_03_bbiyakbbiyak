import { UseMutationResult } from "@tanstack/react-query";

export const valueType = {
  email: "email",
  password: "password",
  userName: "userName",
  rePassword: "rePassword",
  phone: "phone",
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

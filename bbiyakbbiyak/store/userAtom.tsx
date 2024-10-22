import { atom } from "jotai";

export interface User {
  token: string;
  isAuthenticated: boolean;
  authenticate: (token: string) => void;
  logout: () => void;
}

export const userAtom = atom<User>({
  token: "",
  isAuthenticated: false,
  authenticate: (token: string) => {},
  logout: () => {},
});

export const userUpdate = atom();

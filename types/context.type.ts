import type { IUser } from "./usertype";

export interface AuthContextType {
  user: IUser | null;
  token: string | null;
  isInitialized: boolean;
  login: (userInfo: { identifier: string; password: string }) => Promise<IUser>;
  logout: () => void;
  register: (userInfo: {
    username: string;
    email: string;
    phone: string;
    password: string;
    profile?: File;
  }) => Promise<void>;
}

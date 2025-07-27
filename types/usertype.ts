export interface IUser {
  id: number;
  documentId: string;
  username: string;
  email: string;
  fullName?: string;
  phone?: string;
  dateOfBirth?: string;
  createdAt: string;
  updatedAt: string;
}

export interface ICreateUser {
  username: string;
  email: string;
  password: string;
  fullName?: string;
  phone?: string;
  dateOfBirth?: string;
}

export interface ILoginUser {
  identifier: string; // email or username
  password: string;
}

export interface IAuthResponse {
  jwt: string;
  user: IUser;
}

// Aliases for backward compatibility
export type ILogInUser = ILoginUser;
export type IRegisterUser = ICreateUser;
export interface ILoginResponse {
  jwt: string;
  user: IUser;
} 
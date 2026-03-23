export interface IAuthResponse {
    id: string;
    firstName: string;
    lastName: string;
    phoneNumber: string;
    email: string;
    message: string;
    isAuthenticated: boolean;
    userName: string;
    roles: string[];
    token: string;
    refreshToken: string;
    refreshTokenExpiryTime: Date;
    concurrencyStamp: string;
}

export interface IUser {
    id: string;
    firstName: string;
    lastName: string;
    phoneNumber: string;
    email: string;
    roles: string[];
}

export interface UpdateUser {
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
}

export interface ITokenPayload {
  exp: number;
  sub: string;
  role: string;
  [key: string]: any;
}

export interface ILogin {
    Email: string;
    Password: string;
}

export interface IRegister {
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    password: string;
    role: number;
}
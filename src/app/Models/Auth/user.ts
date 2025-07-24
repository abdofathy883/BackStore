export interface User {
    UserId: string;
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

export interface TokenPayload {
  exp: number;
  sub: string;
  role: string;
  [key: string]: any;
}

export interface UserLogin {
    Email: string;
    Password: string;
}

export interface AddNewUser {
    FirstName: string;
    LastName: string;
    Email: string;
    PhoneNumber: string;
    Password: string;
    role: string;
}
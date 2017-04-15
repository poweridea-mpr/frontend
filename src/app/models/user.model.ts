
export enum UserType {
  User = 1,
  Manager = 2,
  Admin = 3,
}

export interface User {
  nickname: string;
  email: string;
  password: string;
  type: UserType;
  name: string;
  phone: string;
}

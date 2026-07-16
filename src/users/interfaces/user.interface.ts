export interface IUser {
  id: number;
  name: string;
  email: string;
  password?: string;
  refreshToken?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IUserCreate {
  name: string;
  email: string;
  password: string;
}

export interface IUserUpdate {
  name?: string;
  email?: string;
  password?: string;
}

export interface IUserResponse extends Omit<IUser, "password"> {}

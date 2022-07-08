export interface IUser {
  username: string,
  email: string,
  role: string,
  password: string,
}

export interface IUserToken {
  username: string,
  email: string,
  role: string,
}

export interface IToken {
  data: IUserToken,
}

export interface ILogin {
  email: string,
  password: string,
}

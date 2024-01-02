export interface User {
  _id: string;
  username: string;
  password: string;
  age: number;
  email: string;
}

export interface UserRegister {
  username: string;
  password: string;
  rePassword: string;
}

export interface UserLogin {
  username: string;
  password: string;
  remember?: boolean;
}

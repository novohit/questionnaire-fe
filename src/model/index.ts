export interface Question {
  _id: string;
  title: string;
  isPublished: boolean;
  isStar: boolean;
  answerCount: number;
  createdAt: string;
  deletedAt: string;
}

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

export interface PageResponse<T> {
  list: Array<T>;
  total: number;
}

// request ========================

export interface SearchOption {
  keyword: string;
  isStar: boolean;
  isDeleted: boolean;
  page: number;
  size: number;
}

// component ===============================
export interface QuestionTitleProps {
  text?: string;
  level?: 1 | 2 | 3 | 4 | 5;
  isCenter?: boolean;
}

export interface QuestionInputProps {
  title?: string;
  placeholder?: string;
}

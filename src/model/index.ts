export interface Question {
  _id: string;
  title: string;
  isPublished: boolean;
  isStar: boolean;
  answerCount: number;
  createdAt: string;
  deletedAt: string;
  components: QuestionComponent[];
}

export interface QuestionComponent {
  userQuestionComponentId: string;
  componentId: string;
  type: string;
  title: string;
  hidden: boolean;
  locked: boolean;
  props: ComponentProps;
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

// component
export interface Component {
  componentId: string;
  type: string;
  defaultProps: ComponentProps;
}

export interface ComponentGroup {
  groupId: number;
  groupName: string;
  components: Array<Component>;
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
export type ComponentProps = QuestionInputProps | QuestionInputProps;

export interface QuestionTitleProps {
  text?: string;
  level?: 1 | 2 | 3 | 4 | 5;
  isCenter?: boolean;

  onChange: (newProps: QuestionTitleProps) => void;
}

export interface QuestionInputProps {
  title?: string;
  placeholder?: string;

  onChange: (newProps: QuestionInputProps) => void;
}

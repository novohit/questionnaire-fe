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
export type ComponentProps =
  | QuestionTitleProps
  | QuestionParagraphProps
  | QuestionInputProps
  | QuestionInputAreaProps
  | QuestionRadioProps;

export interface QuestionTitleProps {
  text?: string;
  level?: 1 | 2 | 3 | 4 | 5;
  isCenter?: boolean;

  onChange: (newProps: QuestionTitleProps) => void;
  disabled: boolean;
}

export interface QuestionParagraphProps {
  text?: string;
  isCenter?: boolean;

  onChange: (newProps: QuestionParagraphProps) => void;
  disabled: boolean;
}

export interface QuestionInputProps {
  title?: string;
  placeholder?: string;

  onChange: (newProps: QuestionInputProps) => void;
  disabled: boolean;
}

export interface QuestionInputAreaProps {
  title?: string;
  placeholder?: string;

  onChange: (newProps: QuestionInputAreaProps) => void;
  disabled: boolean;
}

export interface QuestionRadioProps {
  title?: string;
  options?: RadioOption[];
  defaultOption?: RadioOption;
  direction: 'vertical' | 'horizontal';

  onChange: (newProps: QuestionRadioProps) => void;
  disabled: boolean;
}

// 可以为复杂类型
export interface RadioOption {
  text: string;
}

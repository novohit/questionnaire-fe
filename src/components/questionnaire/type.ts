// component ===============================
export type ComponentPropsType =
  | TitlePropsType
  | ParagraphPropsType
  | InputPropsType
  | InputAreaPropsType
  | RadioPropsType
  | CheckboxPropsType;

export interface TitlePropsType {
  text?: string;
  level?: 1 | 2 | 3 | 4 | 5;
  isCenter?: boolean;

  onChange: (newProps: TitlePropsType) => void;
  disabled: boolean;
}

export interface ParagraphPropsType {
  text?: string;
  isCenter?: boolean;

  onChange: (newProps: ParagraphPropsType) => void;
  disabled: boolean;
}

export interface InputPropsType {
  title?: string;
  placeholder?: string;

  onChange: (newProps: InputPropsType) => void;
  disabled: boolean;
}

export interface InputAreaPropsType {
  title?: string;
  placeholder?: string;

  onChange: (newProps: InputAreaPropsType) => void;
  disabled: boolean;
}

export interface RadioPropsType {
  title?: string;
  options?: Option[];
  defaultOptionValue?: string;
  direction: 'vertical' | 'horizontal';

  onChange: (newProps: RadioPropsType) => void;
  disabled: boolean;
}

// 可以为复杂类型
export interface Option {
  value: string;
  text: string;
  checked?: boolean;
}

export interface CheckboxPropsType {
  title?: string;
  options?: Option[];
  direction: 'vertical' | 'horizontal';

  onChange: (newProps: CheckboxPropsType) => void;
  disabled: boolean;
}

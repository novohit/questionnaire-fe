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
  options?: Option[];
  defaultOptionValue?: string;
  direction: 'vertical' | 'horizontal';

  onChange: (newProps: QuestionRadioProps) => void;
  disabled: boolean;
}

// 可以为复杂类型
export interface Option {
  value: string;
  text: string;
  checked?: boolean;
}

export interface QuestionCheckboxProps {
  title?: string;
  options?: Option[];
  direction: 'vertical' | 'horizontal';

  onChange: (newProps: QuestionCheckboxProps) => void;
  disabled: boolean;
}

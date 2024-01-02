/* eslint-disable @typescript-eslint/no-explicit-any */
import QuestionInput from './QuestionInput/Component';
import QuestionInputProps from './QuestionInput/ComponentProps';
import QuestionTitle from './QuestionTitle/Component';
import QuestionTitleProps from './QuestionTitle/ComponentProps';
import QuestionParagraph from './QuestionParagraph/Component';
import QuestionParagraphProps from './QuestionParagraph/ComponentProps';
import QuestionInputArea from './QuestionInputArea/Component';
import QuestionInputAreaProps from './QuestionInputArea/ComponentProps';
import QuestionRadio from './QuestionRadio/Component';
import QuestionRadioProps from './QuestionRadio/ComponentProps';
import QuestionCheckbox from './QuestionCheckbox/Component';
import QuestionCheckboxProps from './QuestionCheckbox/ComponentProps';

type ComponentConfigs = {
  [key: string]: React.FC<any>;
};

const componentConfigs: ComponentConfigs = {
  input: QuestionInput,
  title: QuestionTitle,
  paragraph: QuestionParagraph,
  inputArea: QuestionInputArea,
  radio: QuestionRadio,
  checkbox: QuestionCheckbox,
  // 在这里添加其他组件类型和对应的组件
};

const componentPropsConfigs: ComponentConfigs = {
  input: QuestionInputProps,
  title: QuestionTitleProps,
  paragraph: QuestionParagraphProps,
  inputArea: QuestionInputAreaProps,
  radio: QuestionRadioProps,
  checkbox: QuestionCheckboxProps,
  // 在这里添加其他组件类型和对应的组件
};

export function getComponentByType(type: string) {
  return componentConfigs[type];
}

export function getComponentPropsByType(type: string) {
  return componentPropsConfigs[type];
}

/* eslint-disable @typescript-eslint/no-explicit-any */
import QuestionInput from './QuestionInput/Component';
import QuestionTitle from './QuestionTitle/Component';
import QuestionInputProps from './QuestionInput/ComponentProps';
import QuestionTitleProps from './QuestionTitle/ComponentProps';

type ComponentConfigs = {
  [key: string]: React.FC<any>;
};

const componentConfigs: ComponentConfigs = {
  input: QuestionInput,
  title: QuestionTitle,
  // 在这里添加其他组件类型和对应的组件
};

const componentPropsConfigs: ComponentConfigs = {
  input: QuestionInputProps,
  title: QuestionTitleProps,
  // 在这里添加其他组件类型和对应的组件
};

export function getComponentByType(type: string) {
  return componentConfigs[type];
}

export function getComponentPropsByType(type: string) {
  return componentPropsConfigs[type];
}

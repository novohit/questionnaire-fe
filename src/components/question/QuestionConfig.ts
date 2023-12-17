/* eslint-disable @typescript-eslint/no-explicit-any */
import QuestionInput from './QuestionInput/Component';
import QuestionTitle from './QuestionTitle/Component';

type ComponentConfigs = {
  [key: string]: React.FC<any>;
};

const componentConfigs: ComponentConfigs = {
  input: QuestionInput,
  title: QuestionTitle,
  // 在这里添加其他组件类型和对应的组件
};

export function getComponentByType(type: string) {
  return componentConfigs[type];
}

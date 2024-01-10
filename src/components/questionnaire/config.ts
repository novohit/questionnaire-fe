/* eslint-disable @typescript-eslint/no-explicit-any */
import Input from './Input/Component';
import InputProps from './Input/ComponentProps';
import Title from './Title/Component';
import TitleProps from './Title/ComponentProps';
import Paragraph from './Paragraph/Component';
import ParagraphProps from './Paragraph/ComponentProps';
import InputArea from './InputArea/Component';
import InputAreaProps from './InputArea/ComponentProps';
import Radio from './Radio/Component';
import RadioProps from './Radio/ComponentProps';
import Checkbox from './Checkbox/Component';
import CheckboxProps from './Checkbox/ComponentProps';
import RadioStats from './Radio/StatsComponent';

type ComponentConfigs = {
  [key: string]: React.FC<any>;
};

const componentConfigs: ComponentConfigs = {
  input: Input,
  title: Title,
  paragraph: Paragraph,
  inputArea: InputArea,
  radio: Radio,
  checkbox: Checkbox,
  // 在这里添加其他组件类型和对应的组件
};

const componentPropsConfigs: ComponentConfigs = {
  input: InputProps,
  title: TitleProps,
  paragraph: ParagraphProps,
  inputArea: InputAreaProps,
  radio: RadioProps,
  checkbox: CheckboxProps,
  // 在这里添加其他组件类型和对应的组件
};

const statsComponentMap: ComponentConfigs = {
  radio: RadioStats,
  // 在这里添加其他组件类型和对应的组件
};

export function getComponentByType(type: string) {
  return componentConfigs[type];
}

export function getComponentPropsByType(type: string) {
  return componentPropsConfigs[type];
}

export function hasAnswerComponent(type: string) {
  if (type === 'title') return false;
  return true;
}

export function getStatsComponentByType(type: string) {
  return statsComponentMap[type];
}

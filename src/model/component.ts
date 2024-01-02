import { ComponentProps } from '../components/question/type';

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

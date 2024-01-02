import { ComponentProps } from '../components/questionnaire/type';

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

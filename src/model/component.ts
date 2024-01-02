import { ComponentPropsType } from '../components/questionnaire/type';

export interface Component {
  componentId: string;
  type: string;
  defaultProps: ComponentPropsType;
}

export interface ComponentGroup {
  groupId: number;
  groupName: string;
  components: Array<Component>;
}

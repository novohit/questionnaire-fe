import { ComponentPropsType } from '../components/questionnaire/type';

export interface Questionnaire {
  _id: string;
  title: string;
  isPublished: boolean;
  isStar: boolean;
  answerCount: number;
  url: string;
  createdAt: string;
  deletedAt: string;
  pageSetting: PageSetting;
  components: QuestionnaireComponent[];
}

export interface PageSetting {
  title: string;
  desc: string;
  js?: string;
  css?: string;
}

export interface QuestionnaireComponent {
  userQuestionComponentId: string;
  componentId: string;
  type: string;
  title: string;
  hidden: boolean;
  locked: boolean;
  props: ComponentPropsType;
}

import { ComponentProps } from '../components/question/type';

export interface Question {
  _id: string;
  title: string;
  isPublished: boolean;
  isStar: boolean;
  answerCount: number;
  createdAt: string;
  deletedAt: string;
  pageSetting: PageSetting;
  components: QuestionComponent[];
}

export interface PageSetting {
  title: string;
  desc: string;
  js: string;
  css: string;
}

export interface QuestionComponent {
  userQuestionComponentId: string;
  componentId: string;
  type: string;
  title: string;
  hidden: boolean;
  locked: boolean;
  props: ComponentProps;
}

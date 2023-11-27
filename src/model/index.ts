export interface Question {
  _id: string;
  title: string;
  isPublished: boolean;
  isStar: boolean;
  answerCount: number;
  createdAt: string;
}

export interface PageResponse<T> {
  list: Array<T>;
  total: number;
}
export interface PageResponse<T> {
  list: Array<T>;
  total: number;
}

// request ========================

export interface PageOption {
  page: number;
  size: number;
}

export interface SearchOption extends PageOption {
  keyword: string;
  isStar: boolean;
  isDeleted: boolean;
}

export interface AnswerSearchOption extends PageOption {
  questionnaireId: string;
}

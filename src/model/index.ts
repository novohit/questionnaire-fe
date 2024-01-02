export interface PageResponse<T> {
  list: Array<T>;
  total: number;
}

// request ========================

export interface SearchOption {
  keyword: string;
  isStar: boolean;
  isDeleted: boolean;
  page: number;
  size: number;
}

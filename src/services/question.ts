import { PageResponse, Question, SearchOption } from '../model';
import http from './http';

// https://juejin.cn/post/7154991998989959181 手动帮助编辑器“修正”类型提示 这里直接用 as
export async function getQuestion(_id: string) {
  const url = `/api/question/${_id}`;
  const data = (await http.get(url)) as Question;
  return data;
}

export async function createQuestion() {
  const url = '/api/question';
  const data = (await http.post(url)) as string;
  return data;
}

// Partial 相当于 ?: 里面的所有属性都为可选
export async function getQuestionList(opt: Partial<SearchOption>) {
  const url = '/api/question';
  const data = (await http.get(url, { params: opt })) as PageResponse<Question>;
  return data;
}

export async function updateQuestion(_id: string, opt: Partial<Question>) {
  const url = `/api/question/${_id}`;
  const data = (await http.put(url, opt)) as string;
  return data;
}

export async function copyQuestion(_id: string) {
  const url = `/api/question/copy/${_id}`;
  const data = (await http.post(url)) as string;
  return data;
}

export async function deleteQuestion(_id: string) {
  const url = `/api/question/${_id}`;
  const data = (await http.delete(url)) as string;
  return data;
}

export async function recoverQuestion(_ids: React.Key[]) {
  const url = '/api/question/recover';
  await http.put(url, _ids);
}

import { PageResponse, SearchOption } from '../model';
import { Questionnaire } from '../model/questionnaire';
import http from './http';

// https://juejin.cn/post/7154991998989959181 手动帮助编辑器“修正”类型提示 这里直接用 as
export async function getQuestionnaire(_id: string) {
  const url = `/api/questionnaire/${_id}`;
  const data = (await http.get(url)) as Questionnaire;
  return data;
}

export async function createQuestionnaire() {
  const url = '/api/questionnaire';
  const data = (await http.post(url)) as string;
  return data;
}

// Partial 相当于 ?: 里面的所有属性都为可选
export async function getQuestionnaires(opt: Partial<SearchOption>) {
  const url = '/api/questionnaire';
  const data = (await http.get(url, {
    params: opt,
  })) as PageResponse<Questionnaire>;
  return data;
}

export async function updateQuestionnaire(
  _id: string,
  opt: Partial<Questionnaire>
) {
  const url = `/api/questionnaire/${_id}`;
  const data = (await http.put(url, opt)) as string;
  return data;
}

export async function copyQuestionnaire(_id: string) {
  const url = `/api/questionnaire/copy/${_id}`;
  const data = (await http.post(url)) as string;
  return data;
}

export async function deleteQuestionnaire(_ids: React.Key[]) {
  const url = '/api/questionnaire';
  // https://stackoverflow.com/questions/60482505/axios-deleteurl-config-type-has-no-properties-in-common-with-type-axiosreq
  await http.delete(url, { data: _ids });
}

export async function recoverQuestionnaire(_ids: React.Key[]) {
  const url = '/api/questionnaire/recover';
  await http.put(url, _ids);
}

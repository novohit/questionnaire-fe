import { AnswerSearchOption, PageResponse } from '../model';
import { Answer } from '../model/answer';
import http from './http';

// Partial 相当于 ?: 里面的所有属性都为可选
export async function getAnswers(opt: Partial<AnswerSearchOption>) {
  const url = `/api/answer/${opt.questionnaireId}`;
  const data = (await http.get(url, {
    params: opt,
  })) as PageResponse<Answer>;
  return data;
}

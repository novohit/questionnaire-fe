import http from './http';

interface Question {
  id: string;
  title: string;
}

// https://juejin.cn/post/7154991998989959181 手动帮助编辑器“修正”类型提示 这里直接用 as
export async function getQuestion(id: string) {
  const url = `/api/question/${id}`;
  const data = (await http.get(url)) as Question;
  return data;
}

export async function createQuestion() {
  const url = '/api/question';
  const data = (await http.post(url)) as number;
  return data;
}

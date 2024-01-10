import { StatsData } from '../components/questionnaire/type';
import http from './http';

export async function getStats(body: {
  questionnaireId: string;
  userQuestionComponentId: string;
  type: string;
}) {
  const url = '/api/stats';
  const data = (await http.post(url, body)) as StatsData;
  return data;
}

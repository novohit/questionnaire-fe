import { RadioStatsProps } from '../components/questionnaire/type';
import http from './http';

export async function getStats(body: {
  questionnaireId: string;
  userQuestionComponentId: string;
  type: string;
}) {
  const url = '/api/stats';
  //   if (body.type === 'radio') {
  const data = (await http.post(url, body)) as RadioStatsProps;
  return data;
  //   }
}

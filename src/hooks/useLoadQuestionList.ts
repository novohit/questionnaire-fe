import { useSearchParams } from 'react-router-dom';
import { SEARCH_KEY } from '../constants';
import { getQuestionList } from '../services/question';
import { useRequest } from 'ahooks';

function useLoadQuestionList() {
  const [searchParams] = useSearchParams();
  const { data, loading, error } = useRequest(
    async () => {
      const keyword = searchParams.get(SEARCH_KEY) || '';

      const data = await getQuestionList({ keyword });

      return data;
    },
    {
      refreshDeps: [searchParams], // 依赖项 刷新
    }
  );

  return { data, loading, error };
}

export default useLoadQuestionList;

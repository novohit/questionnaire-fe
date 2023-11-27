import { useSearchParams } from 'react-router-dom';
import { SEARCH_KEY } from '../constants';
import { getQuestionList } from '../services/question';
import { useRequest } from 'ahooks';

function useLoadQuestionList(opt: { isStar?: boolean; isDeleted?: boolean }) {
  const [searchParams] = useSearchParams();
  const { isStar, isDeleted } = opt;
  const { data, loading, error } = useRequest(
    async () => {
      const keyword = searchParams.get(SEARCH_KEY);
      if (keyword) {
        return await getQuestionList({ keyword, isStar, isDeleted });
      } else {
        return await getQuestionList({ isStar, isDeleted });
      }
    },
    {
      refreshDeps: [searchParams], // 依赖项 刷新
    }
  );

  return { data, loading, error };
}

export default useLoadQuestionList;

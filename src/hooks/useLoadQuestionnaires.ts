import { useSearchParams } from 'react-router-dom';
import {
  DEFAULT_PAGE_SIZE,
  PAGE_NUM_KEY,
  PAGE_SIZE_KEY,
  SEARCH_KEY,
} from '../constants';
import { getQuestionnaires } from '../services/question';
import { useRequest } from 'ahooks';

function useLoadQuestionnaires(opt: { isStar?: boolean; isDeleted?: boolean }) {
  const [searchParams] = useSearchParams();
  const { isStar, isDeleted } = opt;
  const { data, loading, error, refresh } = useRequest(
    async () => {
      const keyword = searchParams.get(SEARCH_KEY);
      const page = parseInt(searchParams.get(PAGE_NUM_KEY) || '') || 1;
      const size =
        parseInt(searchParams.get(PAGE_SIZE_KEY) || '') || DEFAULT_PAGE_SIZE;
      if (keyword) {
        return await getQuestionnaires({
          keyword,
          isStar,
          isDeleted,
          page,
          size,
        });
      } else {
        return await getQuestionnaires({ isStar, isDeleted, page, size });
      }
    },
    {
      refreshDeps: [searchParams], // 依赖项 刷新
    }
  );

  return { data, loading, error, refresh };
}

export default useLoadQuestionnaires;

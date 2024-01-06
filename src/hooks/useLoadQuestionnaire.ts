import { useEffect, useState } from 'react';
import { getQuestionnaire } from '../services/questionnaire';
import { useParams } from 'react-router-dom';
import { resetComponents } from '../store/componentsReducer';
import { resetPageSetting } from '../store/pageSettingReducer';
import { useAppDispatch } from './useRedux';
import { resetQuestionnaire } from '../store/questionnaireReducer';

function useLoadQuestionnaire() {
  const dispatch = useAppDispatch();
  // 获取动态路由的参数
  const { _id = '' } = useParams();
  const [loading, setLoading] = useState(true);
  const [questionnaire, setQuestionnaire] = useState({});

  useEffect(() => {
    async function get() {
      const data = await getQuestionnaire(_id);
      // 存储信息到 Redux
      const {
        pageSetting,
        components,
        title,
        isPublished,
        isStar,
        answerCount,
        url,
        createdAt,
        deletedAt,
      } = data;
      dispatch(resetComponents({ selectedId: '', components }));
      dispatch(resetPageSetting(pageSetting));
      dispatch(
        resetQuestionnaire({
          _id,
          title,
          isPublished,
          isStar,
          answerCount,
          url,
          createdAt,
          deletedAt,
        })
      );
      setQuestionnaire(data);
      setLoading(false);
    }
    get();
  }, []);

  return { loading, questionnaire };
}

export default useLoadQuestionnaire;

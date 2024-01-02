import { useEffect, useState } from 'react';
import { getQuestionnaire } from '../services/questionnaire';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { resetComponents } from '../store/components';
import { resetPageSetting } from '../store/pageInfoReducer';

function useLoadQuestionnaire() {
  const dispatch = useDispatch();
  // 获取动态路由的参数
  const { _id = '' } = useParams();
  const [loading, setLoading] = useState(true);
  const [question, setQuestion] = useState({});

  useEffect(() => {
    async function get() {
      const data = await getQuestionnaire(_id);
      // 存储信息到 Redux
      const { pageSetting, components } = data;
      dispatch(resetComponents({ selectedId: '', components }));
      dispatch(resetPageSetting(pageSetting));
      setQuestion(data);
      setLoading(false);
    }
    get();
  }, []);

  return { loading, question };
}

export default useLoadQuestionnaire;

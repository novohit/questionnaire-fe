import { useEffect, useState } from 'react';
import { getQuestion } from '../services/question';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { resetComponents } from '../store/components';

function useLoadQuestion() {
  const dispatch = useDispatch();
  // 获取动态路由的参数
  const { _id = '' } = useParams();
  const [loading, setLoading] = useState(true);
  const [question, setQuestion] = useState({});

  useEffect(() => {
    async function get() {
      const data = await getQuestion(_id);
      // 存储信息到 Redux
      const { components } = data;
      dispatch(resetComponents({ selectedId: '', components }));
      setQuestion(data);
      setLoading(false);
    }
    get();
  }, []);

  return { loading, question };
}

export default useLoadQuestion;

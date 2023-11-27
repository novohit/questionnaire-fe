import { useEffect, useState } from 'react';
import { getQuestion } from '../services/question';
import { useParams } from 'react-router-dom';

function useLoadQuestion() {
  // 获取动态路由的参数
  const { _id = '' } = useParams();
  const [loading, setLoading] = useState(true);
  const [question, setQuestion] = useState({});

  useEffect(() => {
    async function get() {
      console.log('tst', _id);
      const data = await getQuestion(_id);
      setQuestion(data);
      setLoading(false);
    }
    get();
  }, []);

  return { loading, question };
}

export default useLoadQuestion;

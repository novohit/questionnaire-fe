import React, { FC, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getQuestion } from '../../../services/question';

const Edit: FC = () => {
  // 获取动态路由的参数
  const { id = '' } = useParams();
  const [loading, setLoading] = useState(true);
  const [question, setQuestion] = useState({});

  useEffect(() => {
    async function get() {
      const data = await getQuestion(id);
      setQuestion(data);
      setLoading(false);
    }
    get();
  }, []);

  return (
    <>
      <p>Edit</p>
      {loading ? <p>loading...</p> : <p>{JSON.stringify(question)}</p>}
    </>
  );
};

export default Edit;

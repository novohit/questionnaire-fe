import React, { FC, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getQuestion } from '../../../services/question';

const Edit: FC = () => {
  // 获取动态路由的参数
  const { id = '' } = useParams();
  useEffect(() => {
    async function fn() {
      const data = await getQuestion(id);
      console.log(data);
    }
    fn();
  }, []);
  return (
    <>
      <p>Edit {id}</p>
    </>
  );
};

export default Edit;

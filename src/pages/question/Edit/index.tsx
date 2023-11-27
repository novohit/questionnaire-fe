import React, { FC } from 'react';
import useLoadQuestion from '../../../hooks/useLoadQuestion';

const Edit: FC = () => {
  // 用 hooks 抽取公共逻辑
  const { loading, question } = useLoadQuestion();

  return (
    <>
      <p>Edit</p>
      {loading ? <p>loading...</p> : <p>{JSON.stringify(question)}</p>}
    </>
  );
};

export default Edit;

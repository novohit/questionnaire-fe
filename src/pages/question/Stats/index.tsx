import React, { FC } from 'react';
import useLoadQuestion from '../../../hooks/useLoadQuestion';

const Stats: FC = () => {
  const { loading, question } = useLoadQuestion();

  return (
    <>
      <p>Stats</p>
      {loading ? <p>loading...</p> : <p>{JSON.stringify(question)}</p>}
    </>
  );
};

export default Stats;

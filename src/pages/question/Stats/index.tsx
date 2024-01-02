import React, { FC } from 'react';
import useLoadQuestionnaire from '../../../hooks/useLoadQuestionnaire';

const Stats: FC = () => {
  const { loading, question } = useLoadQuestionnaire();

  return (
    <>
      <p>Stats</p>
      {loading ? <p>loading...</p> : <p>{JSON.stringify(question)}</p>}
    </>
  );
};

export default Stats;

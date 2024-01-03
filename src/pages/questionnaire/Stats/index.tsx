import React, { FC } from 'react';
import useLoadQuestionnaire from '../../../hooks/useLoadQuestionnaire';

const Stats: FC = () => {
  const { loading, questionnaire } = useLoadQuestionnaire();

  return (
    <>
      <p>Stats</p>
      {loading ? <p>loading...</p> : <p>{JSON.stringify(questionnaire)}</p>}
    </>
  );
};

export default Stats;

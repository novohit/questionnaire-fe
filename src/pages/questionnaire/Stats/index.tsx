import React, { FC } from 'react';
import useLoadQuestionnaire from '../../../hooks/useLoadQuestionnaire';
import styles from './index.module.scss';
import StatsHeader from './StatsHeader';
import LeftPanel from './LeftPanel';
import NotFound from '../../NotFound';
import { LoadingSpin } from '../../../components/common';
import List from './List';

const Stats: FC = () => {
  const { loading, questionnaire } = useLoadQuestionnaire();

  if (!loading && !questionnaire?.isPublished) {
    return <NotFound />;
  }

  const questionnaireId = questionnaire?._id || '';

  return (
    <div className={styles.container}>
      {loading && <LoadingSpin />}
      {!loading && (
        <>
          <StatsHeader />
          <div className={styles['content-wrapper']}>
            <div className={styles.content}>
              <div className={styles.left}>
                <LeftPanel />
              </div>
              <div className={styles.main}>
                <List questionnaireId={questionnaireId} />
              </div>
              <div className={styles.right}>right</div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Stats;

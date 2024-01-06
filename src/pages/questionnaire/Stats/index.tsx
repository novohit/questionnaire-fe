import React, { FC } from 'react';
import useLoadQuestionnaire from '../../../hooks/useLoadQuestionnaire';
import styles from './index.module.scss';
import StatsHeader from './StatsHeader';

const Stats: FC = () => {
  useLoadQuestionnaire();

  return (
    <div className={styles.container}>
      <StatsHeader />
      <div className={styles['content-wrapper']}>
        <div className={styles.content}>
          <div className={styles.left}>left</div>
          <div className={styles.main}>main</div>
          <div className={styles.right}>right</div>
        </div>
      </div>
    </div>
  );
};

export default Stats;

/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { FC } from 'react';
import useLoadQuestion from '../../../hooks/useLoadQuestion';
import styles from './index.module.scss';

const Edit: FC = () => {
  // 用 hooks 抽取公共逻辑
  const { loading, question } = useLoadQuestion();

  return (
    <>
      <div className={styles.container}>
        <div>Edit Header</div>
        <div className={styles['content-wrapper']}>
          <div className={styles.content}>
            <div className={styles.left}>left</div>
            <div className={styles.main}>
              <div className={styles['canvas-wrapper']}>
                <div style={{ height: '900px' }}>画布测试滚动</div>
              </div>
            </div>
            <div className={styles.right}>right</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Edit;

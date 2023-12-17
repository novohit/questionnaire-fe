import React, { FC } from 'react';
import styles from './EditCanvas.module.scss';
import QuestionTitle from '../../../components/question/QuestionTitle/Component';
import QuestionInput from '../../../components/question/QuestionInput/Component';

const EditCanvas: FC = () => {
  // 静态展示两个组件
  return (
    <div className={styles.canvas}>
      <div className={styles['component-wrapper']}>
        <div className={styles.component}>
          <QuestionTitle isCenter={false} />
        </div>
      </div>
      <div className={styles['component-wrapper']}>
        <div className={styles.component}>
          <QuestionInput />
        </div>
      </div>
    </div>
  );
};

export default EditCanvas;

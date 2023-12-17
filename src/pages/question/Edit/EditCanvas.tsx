/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { FC } from 'react';
import styles from './EditCanvas.module.scss';
import QuestionTitle from '../../../components/question/QuestionTitle/Component';
import QuestionInput from '../../../components/question/QuestionInput/Component';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store';
import { getComponentByType } from '../../../components/question/QuestionConfig';
import { ComponentProps } from '../../../model';

function genComponent(type: string, props: ComponentProps) {
  const Component = getComponentByType(type);
  if (Component == null) {
    return <></>;
  }
  return <Component {...props} />;
}

const EditCanvas: FC = () => {
  const components = useSelector((state: RootState) => state.components);
  console.log(components);
  // 静态展示两个组件
  return (
    <div className={styles.canvas}>
      {components.map(c => {
        const { _id, type, title, props } = c;
        return (
          <div key={_id} className={styles['component-wrapper']}>
            <div className={styles.component}>{genComponent(type, props)}</div>
          </div>
        );
      })}
      {/* <div className={styles['component-wrapper']}>
        <div className={styles.component}>
          <QuestionTitle isCenter={false} />
        </div>
      </div>
      <div className={styles['component-wrapper']}>
        <div className={styles.component}>
          <QuestionInput />
        </div>
      </div> */}
    </div>
  );
};

export default EditCanvas;

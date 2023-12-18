/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { FC } from 'react';
import styles from './EditCanvas.module.scss';
import QuestionTitle from '../../../components/question/QuestionTitle/Component';
import QuestionInput from '../../../components/question/QuestionInput/Component';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../store';
import { getComponentByType } from '../../../components/question/QuestionConfig';
import { ComponentProps } from '../../../model';
import { selectComponent } from '../../../store/components';
import classNames from 'classnames';

function genComponent(type: string, props: ComponentProps) {
  const Component = getComponentByType(type);
  if (Component == null) {
    return <></>;
  }
  return <Component {...props} />;
}

const EditCanvas: FC = () => {
  const dispatch = useDispatch();
  const componentsState = useSelector(
    (state: RootState) => state.componentsState
  );
  const { selectedId, components } = componentsState;
  // console.log(components);

  function select(event: React.MouseEvent<HTMLDivElement>, _id: string) {
    // 阻止事件冒泡到上层的styles.main
    event.stopPropagation();
    dispatch(selectComponent(_id));
  }

  // 静态展示两个组件
  return (
    <div className={styles.canvas}>
      {components.map(c => {
        const { _id, type, title, props } = c;

        // 拼接 css classname
        const defaultClassName = styles['component-wrapper'];
        const selectedClassName = styles.selected;
        const divClassName = classNames({
          [defaultClassName]: true,
          [selectedClassName]: _id === selectedId,
        });

        return (
          <div key={_id} className={divClassName} onClick={e => select(e, _id)}>
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

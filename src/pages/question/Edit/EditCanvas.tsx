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
import useBindingCanvasKeypress from '../../../hooks/useBindingCanvasKeyPress';

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

  // 监听快捷键
  useBindingCanvasKeypress();

  function select(
    event: React.MouseEvent<HTMLDivElement>,
    userQuestionComponentId: string
  ) {
    // 阻止事件冒泡到上层的styles.main
    event.stopPropagation();
    dispatch(selectComponent(userQuestionComponentId));
  }

  // 静态展示两个组件
  return (
    <div className={styles.canvas}>
      {components
        .filter(c => !c.hidden) // 过滤隐藏的组件
        .map(c => {
          const {
            userQuestionComponentId,
            componentId,
            type,
            title,
            locked,
            props,
          } = c;

          // 拼接 css classname
          const defaultClassName = styles['component-wrapper'];
          const selectedClassName = styles.selected;
          const lockedClassName = styles.locked;
          const divClassName = classNames({
            [defaultClassName]: true,
            [selectedClassName]: userQuestionComponentId === selectedId,
            [lockedClassName]: locked,
          });

          return (
            <div
              key={userQuestionComponentId}
              className={divClassName}
              onClick={e => select(e, userQuestionComponentId)}
            >
              <div className={styles.component}>
                {genComponent(type, props)}
              </div>
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

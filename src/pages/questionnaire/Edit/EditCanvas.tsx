/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { FC } from 'react';
import styles from './EditCanvas.module.scss';
import QuestionTitle from '../../../components/questionnaire/Title/Component';
import QuestionInput from '../../../components/questionnaire/Input/Component';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../store';
import { getComponentByType } from '../../../components/questionnaire/config';
import { ComponentPropsType } from '../../../components/questionnaire/type';
import { moveComponent, selectComponent } from '../../../store/components';
import classNames from 'classnames';
import useBindingCanvasKeypress from '../../../hooks/useBindingCanvasKeyPress';
import SortableContainer from '../../../components/DragSortable/SortableContainer';
import { SortableItem } from '../../../components/DragSortable/SortableItem';

function genComponent(type: string, props: ComponentPropsType) {
  const Component = getComponentByType(type);
  if (Component == null) {
    return <></>;
  }
  return <Component {...props} />;
}

const EditCanvas: FC = () => {
  const dispatch = useDispatch();
  const componentsState = useSelector(
    (state: RootState) => state.componentsState.present
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

  const handleDragEndMove = (oldIndex: number, newIndex: number) => {
    dispatch(moveComponent({ oldIndex, newIndex }));
  };

  // 静态展示两个组件
  return (
    <SortableContainer
      items={components.map(c => {
        return { ...c, id: c.userQuestionComponentId };
      })}
      handleDragEndMove={handleDragEndMove}
    >
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
              <SortableItem
                key={userQuestionComponentId}
                id={userQuestionComponentId}
              >
                <div
                  className={divClassName}
                  onClick={e => select(e, userQuestionComponentId)}
                >
                  <div className={styles.component}>
                    {genComponent(type, props)}
                  </div>
                </div>
              </SortableItem>
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
    </SortableContainer>
  );
};

export default EditCanvas;

import React, { FC, useState } from 'react';
import { RootState } from '../../../store';
import { useDispatch, useSelector } from 'react-redux';
import classNames from 'classnames';
import styles from './ComponentLayerTab.module.scss';
import { Input } from 'antd';
import {
  selectComponent,
  updateComponentTitle,
} from '../../../store/components';

const ComponentLayerTab: FC = () => {
  const dispatch = useDispatch();
  const componentsState = useSelector(
    (state: RootState) => state.componentsState
  );
  const { selectedId, components } = componentsState;

  const [editingId, setEditingId] = useState('');

  const handleTitleClick = (userQuestionComponentId: string) => {
    if (editingId !== userQuestionComponentId) {
      setEditingId('');
    }
    console.log('click', userQuestionComponentId);
  };

  const changeTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newTitle = event.target.value.trim();
    dispatch(
      updateComponentTitle({ userQuestionComponentId: editingId, newTitle })
    );
  };

  return (
    <>
      {components.map(c => {
        const { userQuestionComponentId, title } = c;

        // 拼接 title className
        const titleDefaultClassName = styles.title;
        const selectedClassName = styles.selected;
        const titleClassName = classNames({
          [titleDefaultClassName]: true,
          [selectedClassName]: userQuestionComponentId === selectedId,
        });

        return (
          <div key={userQuestionComponentId} className={styles.wrapper}>
            <div
              className={titleClassName}
              onClick={() => {
                dispatch(selectComponent(userQuestionComponentId));
                handleTitleClick(userQuestionComponentId);
              }}
              onDoubleClick={() => {
                dispatch(selectComponent(userQuestionComponentId));
                setEditingId(userQuestionComponentId);
              }}
            >
              {editingId !== userQuestionComponentId && title}
              {editingId === userQuestionComponentId && (
                <Input
                  autoFocus // 自动聚焦 避免 selectId 和 editingId 会出现不同步的情况
                  value={title}
                  onChange={changeTitle}
                  onPressEnter={() => {
                    setEditingId('');
                  }}
                  onBlur={() => {
                    setEditingId('');
                  }}
                />
              )}
            </div>
            <div className={styles.handler}>按钮</div>
          </div>
        );
      })}
    </>
  );
};

export default ComponentLayerTab;

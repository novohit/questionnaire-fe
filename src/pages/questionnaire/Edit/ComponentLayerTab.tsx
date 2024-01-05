import React, { FC, useState } from 'react';
import classNames from 'classnames';
import styles from './ComponentLayerTab.module.scss';
import { Button, Input, Space } from 'antd';
import {
  hideComponent,
  lockComponent,
  moveComponent,
  selectComponent,
  updateComponentTitle,
} from '../../../store/componentsReducer';
import { EyeOutlined, LockOutlined } from '@ant-design/icons';
import SortableContainer from '../../../components/DragSortable/SortableContainer';
import { SortableItem } from '../../../components/DragSortable/SortableItem';
import { useAppDispatch, useAppSelector } from '../../../hooks/useRedux';

const ComponentLayerTab: FC = () => {
  const dispatch = useAppDispatch();
  const componentsState = useAppSelector(
    state => state.componentsState.present
  );
  const { selectedId, components } = componentsState;

  const [editingId, setEditingId] = useState('');

  const handleTitleClick = (userQuestionComponentId: string) => {
    if (editingId !== userQuestionComponentId) {
      setEditingId('');
    }
  };

  const changeTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newTitle = event.target.value.trim();
    dispatch(
      updateComponentTitle({ userQuestionComponentId: editingId, newTitle })
    );
  };

  const handleDragEndMove = (oldIndex: number, newIndex: number) => {
    dispatch(moveComponent({ oldIndex, newIndex }));
  };

  return (
    <SortableContainer
      items={components.map(c => {
        return { ...c, id: c.userQuestionComponentId };
      })}
      handleDragEndMove={handleDragEndMove}
    >
      {components.map(c => {
        const { userQuestionComponentId, title, hidden, locked } = c;

        // 拼接 title className
        const titleDefaultClassName = styles.title;
        const selectedClassName = styles.selected;
        const titleClassName = classNames({
          [titleDefaultClassName]: true,
          [selectedClassName]: userQuestionComponentId === selectedId,
        });

        return (
          <SortableItem
            key={userQuestionComponentId}
            id={userQuestionComponentId}
          >
            <div className={styles.wrapper}>
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
              <div className={styles.handler}>
                <Space>
                  <Button
                    className={!hidden ? styles.button : ''}
                    shape="circle"
                    size="small"
                    icon={<EyeOutlined />}
                    type={hidden ? 'primary' : 'text'}
                    onClick={() => {
                      dispatch(hideComponent(userQuestionComponentId));
                    }}
                  />
                  <Button
                    className={!locked ? styles.button : ''}
                    shape="circle"
                    size="small"
                    icon={<LockOutlined />}
                    type={locked ? 'primary' : 'text'}
                    onClick={() => {
                      dispatch(lockComponent(userQuestionComponentId));
                    }}
                  />
                </Space>
              </div>
            </div>
          </SortableItem>
        );
      })}
    </SortableContainer>
  );
};

export default ComponentLayerTab;

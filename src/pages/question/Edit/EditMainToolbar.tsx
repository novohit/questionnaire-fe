import {
  DeleteOutlined,
  EyeInvisibleOutlined,
  LockOutlined,
} from '@ant-design/icons';
import { Button, Space, Tooltip } from 'antd';
import React, { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  deleteComponent,
  hideComponent,
  lockComponent,
} from '../../../store/components';
import { RootState } from '../../../store';

const EditMainToolbar: FC = () => {
  const componentsState = useSelector(
    (state: RootState) => state.componentsState
  );
  const dispatch = useDispatch();
  const { selectedId, components } = componentsState;
  const selectedComponent = components.find(
    c => c.userQuestionComponentId === selectedId
  );

  const handleDelete = () => {
    dispatch(deleteComponent());
  };

  const handleHidden = () => {
    dispatch(hideComponent());
  };

  const handleLocked = () => {
    dispatch(lockComponent());
  };

  return (
    <Space>
      <Tooltip title="删除">
        <Button
          shape="circle"
          icon={<DeleteOutlined />}
          onClick={handleDelete}
        />
      </Tooltip>
      <Tooltip title="隐藏">
        <Button
          shape="circle"
          icon={<EyeInvisibleOutlined />}
          onClick={handleHidden}
        />
      </Tooltip>
      <Tooltip title="锁定">
        <Button
          type={selectedComponent?.locked ? 'primary' : 'default'}
          shape="circle"
          icon={<LockOutlined />}
          onClick={handleLocked}
        />
      </Tooltip>
    </Space>
  );
};

export default EditMainToolbar;

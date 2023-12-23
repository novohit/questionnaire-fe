import { DeleteOutlined } from '@ant-design/icons';
import { Button, Space, Tooltip } from 'antd';
import React, { FC } from 'react';
import { useDispatch } from 'react-redux';
import { deleteComponent } from '../../../store/components';

const EditMainToolbar: FC = () => {
  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch(deleteComponent());
  };

  return (
    <Tooltip title="删除">
      <Space>
        <Button
          shape="circle"
          icon={<DeleteOutlined />}
          onClick={handleDelete}
        />
      </Space>
    </Tooltip>
  );
};

export default EditMainToolbar;

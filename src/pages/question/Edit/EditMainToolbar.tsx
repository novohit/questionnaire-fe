import { Button, Space, Tooltip } from 'antd';
import React, { FC } from 'react';

const EditMainToolbar: FC = () => {
  return (
    <Tooltip title="prompt text">
      <Space>
        <Button>del</Button>
      </Space>
    </Tooltip>
  );
};

export default EditMainToolbar;

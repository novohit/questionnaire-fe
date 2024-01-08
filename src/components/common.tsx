import { Spin } from 'antd';
import React, { FC } from 'react';

export const LoadingSpin: FC = () => {
  return (
    <div style={{ textAlign: 'center', marginTop: '100px' }}>
      <Spin />
    </div>
  );
};

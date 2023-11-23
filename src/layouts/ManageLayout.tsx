import React, { FC } from 'react';
import { Outlet } from 'react-router-dom';
import styles from './ManageLayout.module.scss';
import { Button, Divider, Space } from 'antd';
import {
  BarsOutlined,
  DeleteOutlined,
  PlusOutlined,
  StarOutlined,
} from '@ant-design/icons';

const ManageLayout: FC = () => {
  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <Space direction="vertical">
          <Button type="primary" icon={<PlusOutlined />}>
            创建问卷
          </Button>
          <Divider />
          <Button type="default" icon={<BarsOutlined />}>
            我的问卷
          </Button>
          <Button type="default" icon={<StarOutlined />}>
            星标问卷
          </Button>
          <Button type="default" icon={<DeleteOutlined />}>
            回收站
          </Button>
        </Space>
      </div>
      <div className={styles.right}>
        <Outlet />
      </div>
    </div>
  );
};

export default ManageLayout;

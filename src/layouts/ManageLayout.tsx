import React, { FC } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import styles from './ManageLayout.module.scss';
import { Button, Divider, Space } from 'antd';
import {
  BarsOutlined,
  DeleteOutlined,
  PlusOutlined,
  StarOutlined,
} from '@ant-design/icons';

const ManageLayout: FC = () => {
  const nav = useNavigate();
  const { pathname } = useLocation();
  // console.log(pathname);
  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <Space direction="vertical">
          <Button type="primary" icon={<PlusOutlined />} size="large">
            创建问卷
          </Button>
          <Divider />
          <Button
            type={pathname.startsWith('/manage/list') ? 'default' : 'text'}
            icon={<BarsOutlined />}
            onClick={() => {
              nav('/manage/list');
            }}
            size="large"
          >
            我的问卷
          </Button>
          <Button
            type={pathname.startsWith('/manage/star') ? 'default' : 'text'}
            icon={<StarOutlined />}
            onClick={() => {
              nav('/manage/star');
            }}
            size="large"
          >
            收藏问卷
          </Button>
          <Button
            type={pathname.startsWith('/manage/recycle') ? 'default' : 'text'}
            icon={<DeleteOutlined />}
            onClick={() => {
              nav('/manage/recycle');
            }}
            size="large"
          >
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

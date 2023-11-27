import React, { FC, useState } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import styles from './ManageLayout.module.scss';
import { Button, Divider, Space, message } from 'antd';
import {
  BarsOutlined,
  DeleteOutlined,
  PlusOutlined,
  StarOutlined,
} from '@ant-design/icons';
import { createQuestion } from '../services/question';

const ManageLayout: FC = () => {
  const nav = useNavigate();
  const { pathname } = useLocation();

  const [loading, setLoading] = useState<boolean>(false);

  const handleCreateQuestion = async () => {
    setLoading(true);
    const id = (await createQuestion()) || {};
    if (id) {
      nav(`/question/edit/${id}`);
      message.success('创建成功');
    }
    setLoading(false);
  };

  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <Space direction="vertical">
          <Button
            type="primary"
            icon={<PlusOutlined />}
            size="large"
            onClick={handleCreateQuestion}
            disabled={loading}
          >
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

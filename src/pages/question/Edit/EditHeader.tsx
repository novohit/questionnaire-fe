import React, { FC } from 'react';
import styles from './EditHeader.module.scss';
import { Button, Space, Typography } from 'antd';
import { LeftOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import EditMainToolbar from './EditMainToolbar';

const { Title } = Typography;

const EditHeader: FC = () => {
  const nav = useNavigate();

  return (
    <div className={styles['.header-wrapper']}>
      <div className={styles.header}>
        <div className={styles.left}>
          <Space direction="horizontal">
            <Button
              type="link"
              icon={<LeftOutlined />}
              onClick={() => {
                nav(-1);
              }}
            >
              返回
            </Button>
            <Title>问卷标题</Title>
          </Space>
        </div>
        <div className={styles.main}>
          <EditMainToolbar />
        </div>
        <div className={styles.right}>
          <Space direction="horizontal">
            <Button>保存</Button>
            <Button type="primary">发布</Button>
          </Space>
        </div>
      </div>
    </div>
  );
};

export default EditHeader;

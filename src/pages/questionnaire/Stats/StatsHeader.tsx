import React, { FC } from 'react';
import styles from './StatsHeader.module.scss';
import { useAppSelector } from '../../../hooks/useRedux';
import { Button, Space, Typography } from 'antd';
import { LeftOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const { Title } = Typography;

const StatsHeader: FC = () => {
  const { _id, title } = useAppSelector(state => state.questionnaire);
  const nav = useNavigate();

  return (
    <div className={styles['header-wrapper']}>
      <div className={styles.header}>
        <div className={styles.left}>
          <Space>
            <Button type="link" icon={<LeftOutlined />} onClick={() => nav(-1)}>
              返回
            </Button>
            <Title>{title}</Title>
          </Space>
        </div>
        <div className={styles.main}>main</div>
        <div className={styles.right}>
          <Button
            type="primary"
            onClick={() => nav(`/questionnaire/edit/${_id}`)}
          >
            编辑问卷
          </Button>
        </div>
      </div>
    </div>
  );
};

export default StatsHeader;

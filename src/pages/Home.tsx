import { Button, Typography } from 'antd';
import React, { FC, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { MANAGE_INDEX_PATH } from '../router';
import styles from './Home.module.scss';
import axios from 'axios';
import '../mock/index'; // 需要引用 mockjs 才会劫持

const { Title, Paragraph } = Typography;
const Home: FC = () => {
  const nav = useNavigate();

  useEffect(() => {
    axios.get('/api/test').then(res => console.log('res ', res));
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.info}>
        <Title>问卷调查 | 在线投票</Title>
        <Paragraph>
          已累计创建问卷 100 份，发布问卷 90 份，收到答卷 980 份
        </Paragraph>
        <div>
          <Button type="primary" onClick={() => nav(MANAGE_INDEX_PATH)}>
            开始使用
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Home;

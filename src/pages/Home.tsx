import { Button, Typography } from 'antd';
import React, { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { MANAGE_INDEX_PATH } from '../router';
import styles from './Home.module.scss';

const { Title, Paragraph } = Typography;
const Home: FC = () => {
  const nav = useNavigate();
  // function clickHandler() {
  //   nav({ pathname: '/login', search: 'name=test' });
  // }

  // return (
  //   <>
  //     <div>
  //       <p>Home</p>
  //       <Button type="primary">登录</Button>
  //       {/* 两种路由跳转方式 */}
  //       <button onClick={clickHandler}>登录</button>
  //       <Link to={'/register?name=aa'}>注册</Link>
  //     </div>
  //   </>
  // );

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

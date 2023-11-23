import Layout, { Content, Footer, Header } from 'antd/es/layout/layout';
import React, { FC } from 'react';
import { Outlet } from 'react-router-dom';
import styles from './MainLayout.module.scss';
import Logo from '../components/Logo';

const MainLayout: FC = () => {
  return (
    <Layout>
      <Header className={styles.header}>
        <div className={styles.left}>
          <Logo />
        </div>
        <div className={styles.right}>登录/用户信息</div>
      </Header>
      <Content className={styles.main}>
        <Outlet />
      </Content>
      <Footer className={styles.footer}>Copyright © 2023-present novo.</Footer>
    </Layout>
  );
};

export default MainLayout;

import { Button } from 'antd';
import React, { FC } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Home: FC = () => {
  const nav = useNavigate();
  function clickHandler() {
    nav({ pathname: '/login', search: 'name=test' });
  }

  return (
    <>
      <div>
        <p>Home</p>
        <Button type="primary">登录</Button>
        {/* 两种路由跳转方式 */}
        <button onClick={clickHandler}>登录</button>
        <Link to={'/register?name=aa'}>注册</Link>
      </div>
    </>
  );
};

export default Home;

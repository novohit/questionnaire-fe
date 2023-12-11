import React, { FC, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LOGIN_PATH } from '../router';
import { clearToken, getToken } from '../utils/token';
import { getUserInfo } from '../services/user';
import { User } from '../model';
import { UserOutlined } from '@ant-design/icons';
import { Button } from 'antd';

const UserInfo: FC = () => {
  const nav = useNavigate();
  const [userInfo, setUserInfo] = useState<User>();
  const token = getToken();

  // TODO 登录成功后 UserInfo 不会重新渲染
  useEffect(() => {
    async function get() {
      const user = await getUserInfo();
      setUserInfo(user);
    }
    get();
  }, []);

  const logout = () => {
    clearToken();
    nav(LOGIN_PATH);
  };

  const element = (
    <>
      {token && userInfo && (
        <>
          <span style={{ color: '#e8e8e8' }}>
            <UserOutlined />
            {userInfo.username}
          </span>
          <Button type="link" onClick={logout}>
            退出
          </Button>
        </>
      )}

      {!token && (
        <>
          <Link to={LOGIN_PATH}>登录</Link>
        </>
      )}
    </>
  );

  return <>{element}</>;
};

export default UserInfo;

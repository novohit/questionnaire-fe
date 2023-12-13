import React, { FC } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LOGIN_PATH } from '../router';
import { clearToken } from '../utils/token';
import { UserOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { logoutReducer } from '../store/userReducer';
import useLoadUserInfo from '../hooks/useLoadUserInfo';

const UserInfo: FC = () => {
  const nav = useNavigate();
  const userState = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();

  useLoadUserInfo();

  const logout = () => {
    clearToken();
    dispatch(logoutReducer());
    nav(LOGIN_PATH);
  };

  const element = (
    <>
      {userState.username && (
        <>
          <span style={{ color: '#e8e8e8' }}>
            <UserOutlined />
            {userState.username}
          </span>
          <Button type="link" onClick={logout}>
            退出
          </Button>
        </>
      )}

      {!userState.username && (
        <>
          <Link to={LOGIN_PATH}>登录</Link>
        </>
      )}
    </>
  );

  return <>{element}</>;
};

export default UserInfo;

import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import { LOGIN_PATH } from '../router';

const UserInfo: FC = () => {
  // TODO 登录/用户信息
  return (
    <>
      <Link to={LOGIN_PATH}>登录</Link>
    </>
  );
};

export default UserInfo;

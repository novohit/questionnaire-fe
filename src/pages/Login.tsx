import React, { FC } from 'react';
import { useNavigate } from 'react-router-dom';

const Login: FC = () => {
  const nav = useNavigate();
  return (
    <>
      <p>Login</p>
      <div>
        {/* -1 返回上一级 */}
        <button onClick={() => nav(-1)}>返回</button>
      </div>
    </>
  );
};

export default Login;

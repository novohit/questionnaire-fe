import { Button, Result } from 'antd';
import React, { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { HOME_PATH } from '../router';

const NotFound: FC = () => {
  const nav = useNavigate();

  return (
    <Result
      status="404"
      title="404"
      subTitle="Sorry, the page you visited does not exist."
      extra={
        <Button
          type="primary"
          onClick={() => {
            nav(HOME_PATH);
          }}
        >
          Back Home
        </Button>
      }
    />
  );
};

export default NotFound;

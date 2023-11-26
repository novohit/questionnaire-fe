import { UserAddOutlined } from '@ant-design/icons';
import { Button, Form, Input, Space, Typography } from 'antd';
import React, { FC } from 'react';
import styles from './Register.module.scss';
import { Link } from 'react-router-dom';
import { LOGIN_PATH } from '../router';

const { Title } = Typography;

interface UserRegister {
  username: string;
  password: string;
  rePassword: string;
}

const Register: FC = () => {
  const onFinish = (values: UserRegister) => {
    console.log('Success:', values);
  };

  return (
    <>
      <div className={styles.container}>
        <div>
          <Space>
            <Title level={2}>
              <UserAddOutlined />
            </Title>
            <Title level={2}>注册新用户</Title>
          </Space>
        </div>
        <Form
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 16 }}
          onFinish={onFinish}
        >
          <Form.Item label="用户名" name="username">
            <Input />
          </Form.Item>
          <Form.Item label="密码" name="password">
            <Input.Password />
          </Form.Item>
          <Form.Item label="确认密码" name="rePassword">
            <Input.Password />
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 6, span: 20 }}>
            <Space direction="horizontal">
              <Button type="primary" htmlType="submit">
                注册
              </Button>
              <Link to={LOGIN_PATH}>已有账户，去登录</Link>
            </Space>
          </Form.Item>
        </Form>
      </div>
    </>
  );
};

export default Register;

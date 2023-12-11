import { UserAddOutlined } from '@ant-design/icons';
import { Button, Form, Input, Space, Typography, message } from 'antd';
import React, { FC } from 'react';
import styles from './Register.module.scss';
import { Link, useNavigate } from 'react-router-dom';
import { LOGIN_PATH } from '../router';
import { UserRegister } from '../model';
import { useRequest } from 'ahooks';
import { register } from '../services/user';

const { Title } = Typography;

const Register: FC = () => {
  const nav = useNavigate();

  const { run } = useRequest(
    async (values: UserRegister) =>
      await register({ username: values.username, password: values.password }),
    {
      manual: true,
      onSuccess() {
        message.success('注册成功');
        nav(LOGIN_PATH);
      },
    }
  );

  const onFinish = (values: UserRegister) => {
    run(values);
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
          <Form.Item
            label="用户名"
            name="username"
            rules={[
              { required: true, message: '请输入用户名' },
              {
                type: 'string',
                min: 4,
                max: 20,
                message: '字符长度在 4-20 之间',
              },
              { pattern: /^\w+$/, message: '只能为字母数学或下划线' },
            ]}
            validateFirst={true} // 当某一规则校验不通过时，是否停止剩下的规则的校验
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="密码"
            name="password"
            rules={[{ required: true, message: '请输入密码' }]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item
            label="确认密码"
            name="rePassword"
            dependencies={['password']} // 依赖于 password ，password 变化，会重新触发 validator
            rules={[
              { required: true, message: '请确认密码' },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  } else {
                    return Promise.reject(new Error('密码不一致'));
                  }
                },
              }),
            ]}
            validateFirst={true}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 6, span: 18 }}>
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

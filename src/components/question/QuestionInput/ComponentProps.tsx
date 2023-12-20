import { Form, Input } from 'antd';
import React, { FC } from 'react';
import { QuestionInputProps } from '../../../model';

const ComponentProps: FC<QuestionInputProps> = (props: QuestionInputProps) => {
  const { title = '输入框标题', placeholder = '请输入...' } = { ...props };
  return (
    <Form layout="vertical" initialValues={{ title, placeholder }}>
      <Form.Item label="标题" name="title">
        <Input />
      </Form.Item>
      <Form.Item label="Placeholder" name="placeholder">
        <Input />
      </Form.Item>
    </Form>
  );
};

export default ComponentProps;

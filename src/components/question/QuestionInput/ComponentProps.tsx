import { Form, Input } from 'antd';
import React, { FC, useEffect } from 'react';
import { QuestionInputProps } from '../../../model';

const ComponentProps: FC<QuestionInputProps> = (props: QuestionInputProps) => {
  const { title, placeholder } = { ...props };
  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue(props);
  }, [form]);

  return (
    <Form form={form} layout="vertical" initialValues={{ title, placeholder }}>
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

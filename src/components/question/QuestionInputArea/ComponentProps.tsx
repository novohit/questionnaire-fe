import { Form, Input } from 'antd';
import React, { FC, useEffect } from 'react';
import { QuestionInputAreaProps } from '../type';

const { TextArea } = Input;

const ComponentProps: FC<QuestionInputAreaProps> = (
  props: QuestionInputAreaProps
) => {
  const { title, placeholder, onChange, disabled } = { ...props };
  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue(props);
  }, [props]);

  function onValuesChange() {
    onChange(form.getFieldsValue());
  }

  return (
    <Form
      disabled={disabled}
      form={form}
      layout="vertical"
      initialValues={{ title, placeholder }}
      onValuesChange={onValuesChange}
    >
      <Form.Item label="标题" name="title">
        <Input />
      </Form.Item>
      <Form.Item label="Placeholder" name="placeholder">
        <TextArea autoSize={{ minRows: 3, maxRows: 6 }} />
      </Form.Item>
    </Form>
  );
};

export default ComponentProps;

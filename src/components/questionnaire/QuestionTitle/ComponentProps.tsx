import { Checkbox, Form, Input, Select } from 'antd';
import React, { FC, useEffect } from 'react';
import { QuestionTitleProps } from '../type';

const ComponentProps: FC<QuestionTitleProps> = (props: QuestionTitleProps) => {
  const { text, level, isCenter, onChange, disabled } = { ...props };
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
      initialValues={{ text, level, isCenter }}
      onValuesChange={onValuesChange}
    >
      <Form.Item label="标题" name="text">
        <Input />
      </Form.Item>
      <Form.Item label="层级" name="level">
        <Select
          options={[
            { value: 1, text: 1 },
            { value: 2, text: 2 },
            { value: 3, text: 3 },
          ]}
        />
      </Form.Item>
      <Form.Item label="居中显示" name="isCenter" valuePropName="checked">
        <Checkbox />
      </Form.Item>
    </Form>
  );
};

export default ComponentProps;

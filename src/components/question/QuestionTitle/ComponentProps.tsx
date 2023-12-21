import { Checkbox, Form, Input, Select } from 'antd';
import React, { FC, useEffect } from 'react';
import { QuestionTitleProps } from '../../../model';

const ComponentProps: FC<QuestionTitleProps> = (props: QuestionTitleProps) => {
  const { text, level, isCenter, onChange } = { ...props };
  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue(props);
    console.log(form);
  }, [props]);

  function onValuesChange() {
    onChange(form.getFieldsValue());
  }

  return (
    <Form
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
      <Form.Item label="居中显示" valuePropName="checked">
        <Checkbox />
      </Form.Item>
    </Form>
  );
};

export default ComponentProps;

import { Checkbox, Form, Input, Select } from 'antd';
import React, { FC } from 'react';
import { QuestionInputProps } from '../../../model';

const ComponentProps: FC<QuestionInputProps> = (props: QuestionInputProps) => {
  const { text = '一行标题', level = 1, isCenter = true } = { ...props };
  return (
    <Form layout="vertical" initialValues={{ text, level, isCenter }}>
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

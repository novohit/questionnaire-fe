import { Checkbox, Form, Input } from 'antd';
import React, { FC, useEffect } from 'react';
import { QuestionParagraphProps } from '../type';

const { TextArea } = Input;

const ComponentProps: FC<QuestionParagraphProps> = (
  props: QuestionParagraphProps
) => {
  const { text, isCenter, onChange, disabled } = { ...props };
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
      initialValues={{ text, isCenter }}
      onValuesChange={onValuesChange}
    >
      <Form.Item label="段落内容" name="text">
        <TextArea autoSize={{ minRows: 3, maxRows: 6 }} />
      </Form.Item>
      <Form.Item label="居中显示" name="isCenter" valuePropName="checked">
        <Checkbox />
      </Form.Item>
    </Form>
  );
};

export default ComponentProps;

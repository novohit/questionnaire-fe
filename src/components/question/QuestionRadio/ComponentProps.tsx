import React, { FC, useEffect } from 'react';
import { QuestionRadioProps } from '../../../model';
import { Button, Form, Input, Select, Space } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';

const ComponentProps: FC<QuestionRadioProps> = (props: QuestionRadioProps) => {
  const {
    title,
    options = [],
    defaultOption,
    direction,
    onChange,
    disabled,
  } = {
    ...props,
  };
  console.log(options, defaultOption, direction);
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
      initialValues={{ title }}
      onValuesChange={onValuesChange}
    >
      <Form.Item label="标题" name="title">
        <Input />
      </Form.Item>
      <Form.Item label="选项">
        <Form.List name="options">
          {(fields, { add, remove }, { errors }) => (
            <>
              {console.log(errors)}
              {/* 遍历所有选项 */}
              {fields.map(field => {
                console.log(field);
                return (
                  /* baseline 对齐选项框和icon */
                  <Space key={field.key} align="baseline">
                    <Form.Item
                      name={[field.name, 'text']}
                      validateTrigger={['onBlur']}
                      rules={[
                        {
                          required: true,
                          message: '选项不能为空',
                        },
                      ]}
                      validateFirst={true}
                    >
                      <Input />
                    </Form.Item>
                    {fields.length > 2 ? (
                      <MinusCircleOutlined onClick={() => remove(field.name)} />
                    ) : null}
                  </Space>
                );
              })}
              <Form.Item>
                <Button
                  type="link"
                  block
                  onClick={() => add({ text: '' })}
                  icon={<PlusOutlined />}
                >
                  添加选项
                </Button>
                <Form.ErrorList errors={errors} />
              </Form.Item>
            </>
          )}
        </Form.List>
      </Form.Item>
      <Form.Item label="选项排列" name="direction">
        <Select
          value={direction}
          options={[
            { value: 'vertical', label: '垂直' },
            { value: 'horizontal', label: '水平' },
          ]}
        ></Select>
      </Form.Item>
    </Form>
  );
};

export default ComponentProps;

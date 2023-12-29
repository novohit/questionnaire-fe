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
        <Form.List
          name="options"
          rules={[
            {
              validator: (_, value) => {
                console.log(' value', value);
                // TODO BUG ErrorList 接收不到这里的error
                return Promise.reject(new Error('At least 2 passengers'));
              },
            },
          ]}
        >
          {(fields, { add, remove }, { errors }) => (
            <>
              {fields.map(field => (
                // console.log(field);
                <Space key={field.key} align="baseline">
                  <Form.Item
                    name={[field.name, 'text']}
                    validateTrigger={['onChange', 'onBlur']}
                    rules={[
                      {
                        required: true,
                        message: '选项不能为空',
                      },
                      {
                        validator: (_, value) => {
                          let count = 0;
                          options.forEach(opt => {
                            if (opt.text === value) count++;
                          });
                          if (count > 1) {
                            return Promise.reject(new Error('选项重复'));
                          } else {
                            return Promise.resolve();
                          }
                        },
                      },
                    ]}
                    validateFirst={true}
                  >
                    <Input />
                  </Form.Item>
                  {fields.length > 2 ? (
                    <MinusCircleOutlined
                      onClick={() => {
                        remove(field.name);
                        form.validateFields(); // 添加和删除都手动触发一下校验
                      }}
                    />
                  ) : null}
                </Space>
              ))}
              <Form.Item>
                <Button
                  type="link"
                  block
                  onClick={() => {
                    add({ text: '' });
                    form.validateFields();
                  }}
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

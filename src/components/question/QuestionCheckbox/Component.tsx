import React, { FC } from 'react';
import { QuestionCheckboxProps } from '../type';
import { Checkbox, Space, Typography } from 'antd';
import { nanoid } from '@reduxjs/toolkit';

const { Paragraph } = Typography;

const QuestionCheckbox: FC<QuestionCheckboxProps> = (
  props: QuestionCheckboxProps
) => {
  const {
    title,
    options,
    direction = 'horizontal',
  } = {
    ...props,
  };

  return (
    <>
      <Paragraph strong>{title}</Paragraph>
      <Space direction={direction}>
        {options?.map(opt => {
          const { text, value, checked } = opt;
          return (
            /* key用nanoid 添加重复选项 防止控制台报错 */
            <Checkbox key={nanoid()} value={value} checked={checked}>
              {text}
            </Checkbox>
          );
        })}
      </Space>
    </>
  );
};

export default QuestionCheckbox;

import React, { FC } from 'react';
import { QuestionRadioProps } from '../../../model';
import { Radio, Space, Typography } from 'antd';
import { nanoid } from '@reduxjs/toolkit';

const { Paragraph } = Typography;

const QuestionRadio: FC<QuestionRadioProps> = (props: QuestionRadioProps) => {
  const {
    title,
    options,
    defaultOptionValue,
    direction = 'horizontal',
  } = {
    ...props,
  };

  return (
    <>
      <Paragraph strong>{title}</Paragraph>
      <Radio.Group value={defaultOptionValue}>
        <Space direction={direction}>
          {options?.map(opt => {
            return (
              /* key用nanoid 添加重复选项 防止控制台报错 */
              <Radio key={nanoid()} value={opt.value}>
                {opt.text}
              </Radio>
            );
          })}
        </Space>
      </Radio.Group>
    </>
  );
};

export default QuestionRadio;

import React, { FC } from 'react';
import { InputPropsType } from '../type';
import { Input, Typography } from 'antd';

const { Paragraph } = Typography;

const QuestionInput: FC<InputPropsType> = (props: InputPropsType) => {
  const { title, placeholder } = { ...props };
  return (
    <>
      <Paragraph strong>{title}</Paragraph>
      <div>
        <Input placeholder={placeholder} />
      </div>
    </>
  );
};

export default QuestionInput;

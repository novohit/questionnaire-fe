import React, { FC } from 'react';
import { QuestionInputProps } from '../../../model';
import { Input, Typography } from 'antd';

const { Paragraph } = Typography;

const QuestionInput: FC<QuestionInputProps> = (props: QuestionInputProps) => {
  const { title = '输入框标题', placeholder = '请输入...' } = { ...props };
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

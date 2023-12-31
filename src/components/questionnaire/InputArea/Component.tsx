import React, { FC } from 'react';
import { InputAreaPropsType } from '../type';
import { Input, Typography } from 'antd';

const { Paragraph } = Typography;
const { TextArea } = Input;

const QuestionInputArea: FC<InputAreaPropsType> = (
  props: InputAreaPropsType
) => {
  const { title, placeholder } = { ...props };
  return (
    <>
      <Paragraph strong>{title}</Paragraph>
      <div>
        <TextArea placeholder={placeholder} autoSize={{ minRows: 3 }} />
      </div>
    </>
  );
};

export default QuestionInputArea;

import React, { FC } from 'react';
import { QuestionInputAreaProps } from '../../../model';
import { Input, Typography } from 'antd';

const { Paragraph } = Typography;
const { TextArea } = Input;

const QuestionInputArea: FC<QuestionInputAreaProps> = (
  props: QuestionInputAreaProps
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

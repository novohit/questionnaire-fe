import React, { FC } from 'react';
import { QuestionParagraphProps } from '../../../model';
import { Typography } from 'antd';
import DOMPurify from 'dompurify';

const { Paragraph } = Typography;

const QuestionParagraph: FC<QuestionParagraphProps> = (
  props: QuestionParagraphProps
) => {
  const { text = '', isCenter } = { ...props };
  // 防止 xss 攻击 https://github.com/cure53/DOMPurify
  const markup = { __html: DOMPurify.sanitize(text.replaceAll('\n', '<br/>')) };
  return (
    <Paragraph
      style={{ textAlign: isCenter ? 'center' : 'start', marginBottom: '0' }}
    >
      {<div dangerouslySetInnerHTML={markup} />}
    </Paragraph>
  );
};

export default QuestionParagraph;

import React, { FC, useState } from 'react';
import { getAnswers } from '../../../services/answer';
import { DEFAULT_PAGE_SIZE } from '../../../constants';
import { PageResponse } from '../../../model';
import { Answer } from '../../../model/answer';
import { useRequest } from 'ahooks';
import { Empty, Table } from 'antd';
import { LoadingSpin } from '../../../components/common';
import { useAppSelector } from '../../../hooks/useRedux';

const List: FC<{ questionnaireId: string }> = (props: {
  questionnaireId: string;
}) => {
  const [answers, setAnswers] = useState<Answer[]>([]);

  const componentsState = useAppSelector(
    state => state.componentsState.present
  );
  const { components } = componentsState;

  const { loading } = useRequest(
    async () => {
      const data = await getAnswers({
        questionnaireId: props.questionnaireId,
        page: 1,
        size: DEFAULT_PAGE_SIZE,
      });
      return data;
    },
    {
      onSuccess: (res: PageResponse<Answer>) => {
        const { list } = res;
        setAnswers(list);
      },
    }
  );

  const columns = components.map(c => {
    const { userQuestionComponentId, props } = c;
    if ('title' in props) {
      // eslint-disable-next-line react/prop-types
      const { title } = props as { title: string };
      return { title: title, dataIndex: ['map', userQuestionComponentId] };
    }
    return { title: c.title, dataIndex: ['map', userQuestionComponentId] };
  });

  return (
    <>
      {loading && <LoadingSpin />}
      {!loading && answers.length === 0 && <Empty description="暂无数据" />}
      {!loading && answers.length > 0 && (
        <Table
          rowKey={a => a.answerId}
          dataSource={answers}
          columns={columns}
          pagination={false}
        />
      )}
    </>
  );
};

export default List;

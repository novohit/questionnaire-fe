import React, { FC, useState } from 'react';
import { getAnswers } from '../../../services/answer';
import { DEFAULT_PAGE_SIZE } from '../../../constants';
import { PageResponse } from '../../../model';
import { Answer } from '../../../model/answer';
import { useRequest } from 'ahooks';
import { Empty, Pagination, Table, Typography } from 'antd';
import { LoadingSpin } from '../../../components/common';
import { hasAnswerComponent } from '../../../components/questionnaire/config';
import styles from '../../Common.module.scss';
import { QuestionnaireComponent } from '../../../model/questionnaire';

const { Title } = Typography;

type Props = {
  questionnaireId: string;
  components: QuestionnaireComponent[];
  selectedId: string;
  setSelectedId: (id: string) => void;
  setSelectedType: (type: string) => void;
};

const AnswerList: FC<Props> = (props: Props) => {
  const {
    questionnaireId,
    components,
    selectedId,
    setSelectedId,
    setSelectedType,
  } = props;
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [total, setTotal] = useState(0);
  const [current, setCurrent] = useState(3);
  const [size, setSize] = useState(DEFAULT_PAGE_SIZE);

  const { loading } = useRequest(
    async () => {
      const data = await getAnswers({
        questionnaireId,
        page: 1,
        size: DEFAULT_PAGE_SIZE,
      });
      return data;
    },
    {
      refreshDeps: [current, size],
      onSuccess: (res: PageResponse<Answer>) => {
        const { list, total } = res;
        setAnswers(list);
        setTotal(total);
      },
    }
  );

  // 排除没有输入的组件
  const hasAnswerComponents = components.filter(c => {
    if (hasAnswerComponent(c.type)) return true;
    return false;
  });

  const columns = hasAnswerComponents.map(c => {
    const { userQuestionComponentId, props } = c;
    let temp = c.title;
    if ('title' in props) {
      // eslint-disable-next-line react/prop-types
      const { title } = props as { title: string };
      temp = title;
    }
    return {
      title: (
        <div style={{ cursor: 'pointer' }}>
          <span
            style={{
              color:
                selectedId === c.userQuestionComponentId
                  ? '#1890ff'
                  : 'inherit',
            }}
            onClick={() => {
              setSelectedId(c.userQuestionComponentId);
              setSelectedType(c.type);
            }}
          >
            {temp}
          </span>
        </div>
      ),
      dataIndex: ['map', userQuestionComponentId],
    };
  });

  return (
    <>
      <Title level={3}>答卷数量: {!loading && total}</Title>
      <div className={styles.content}>
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
      </div>
      <div className={styles.footer}>
        {!loading && answers.length > 0 && (
          <Pagination
            current={current}
            pageSize={size}
            total={total}
            onChange={(page, size) => {
              console.log(page, size);
              setCurrent(page);
              setSize(size);
            }}
          />
        )}
      </div>
    </>
  );
};

export default AnswerList;

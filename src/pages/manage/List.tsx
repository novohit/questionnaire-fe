/* eslint-disable @typescript-eslint/no-unused-vars */

import React, { FC, useEffect, useState } from 'react';
import styles from './Common.module.scss';
import QuestionCard from '../../components/QuestionCard';
import { useRequest, useTitle } from 'ahooks';
import { Empty, Spin, Typography } from 'antd';
import ListSearch from '../../components/ListSearch';
import { getQuestionList } from '../../services/question';
import { Question } from '../../model';
import { useSearchParams } from 'react-router-dom';

const mockQuestionList = [
  {
    _id: 'q1',
    title: '问卷1',
    isPublished: false,
    isStar: true,
    answerCount: 23,
    createdAt: '2023-11-18 15:42:22',
  },
  {
    _id: 'q2',
    title: '问卷2',
    isPublished: true,
    isStar: false,
    answerCount: 3,
    createdAt: '2023-11-18 15:42:22',
  },
  {
    _id: 'q3',
    title: '问卷3',
    isPublished: false,
    isStar: true,
    answerCount: 3,
    createdAt: '2023-11-18 15:42:22',
  },
  {
    _id: 'q4',
    title: '问卷4',
    isPublished: true,
    isStar: false,
    answerCount: 13,
    createdAt: '2023-11-18 15:42:22',
  },
];

const { Title } = Typography;

const List: FC = () => {
  useTitle('问卷星 - 我的问卷');
  // const [searchParams] = useSearchParams();
  // console.log('keyword', searchParams.get('keyword'));
  // const [questionList, setQuestionList] = useState<Question[]>([]);

  // useEffect(() => {
  //   async function load() {
  //     const data = await getQuestionList();
  //     const { list, total } = data;
  //     console.log(total);
  //     setQuestionList(list);
  //   }
  //   load();
  // }, []);

  const { data, loading } = useRequest(getQuestionList);
  const questionList = data?.list || [];

  return (
    <>
      <div className={styles.header}>
        <div className={styles.left}>
          <Title level={3}>我的问卷</Title>
        </div>
        <div className={styles.right}>
          <ListSearch />
        </div>
      </div>
      <div className={styles.content}>
        {loading && (
          <div style={{ textAlign: 'center' }}>
            <Spin />
          </div>
        )}
        {!loading && questionList.length === 0 && (
          <Empty description="暂无数据" />
        )}
        {!loading &&
          questionList.length > 0 &&
          questionList.map(q => {
            const { _id } = q;
            return <QuestionCard key={_id} {...q} />;
          })}
      </div>
      <div className={styles.footer}>Load more</div>
    </>
  );
};

export default List;

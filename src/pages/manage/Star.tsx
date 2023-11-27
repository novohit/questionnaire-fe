/* eslint-disable @typescript-eslint/no-unused-vars */
import { Empty, Spin, Typography } from 'antd';
import React, { FC, useState } from 'react';
import styles from './Common.module.scss';
import QuestionCard from '../../components/QuestionCard';
import { useTitle } from 'ahooks';
import ListSearch from '../../components/ListSearch';
import useLoadQuestionList from '../../hooks/useLoadQuestionList';

const mockStarList = [
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
    isStar: true,
    answerCount: 3,
    createdAt: '2023-11-18 15:42:22',
  },
];

const { Title } = Typography;

const Star: FC = () => {
  useTitle('问卷星 - 收藏问卷');

  // const [starList, setStarList] = useState(mockStarList);
  const { data, loading, error } = useLoadQuestionList({ isStar: true });
  const starList = data?.list || [];

  return (
    <>
      <div className={styles.header}>
        <div className={styles.left}>
          <Title level={3}>收藏问卷</Title>
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
        {!loading && starList.length === 0 && <Empty description="暂无数据" />}
        {!loading &&
          starList.length > 0 &&
          starList.map(q => {
            const { _id } = q;
            return <QuestionCard key={_id} {...q} />;
          })}
      </div>
      <div className={styles.footer}>分页</div>
    </>
  );
};

export default Star;

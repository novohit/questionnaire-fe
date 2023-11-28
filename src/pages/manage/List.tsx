/* eslint-disable @typescript-eslint/no-unused-vars */

import React, { FC, useEffect, useRef, useState } from 'react';
import styles from './Common.module.scss';
import QuestionCard from '../../components/QuestionCard';
import { useTitle } from 'ahooks';
import { Empty, Spin, Typography } from 'antd';
import ListSearch from '../../components/ListSearch';
import { getQuestionList } from '../../services/question';
import { Question } from '../../model';
import useLoadQuestionList from '../../hooks/useLoadQuestionList';
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
  const [questionList, setQuestionList] = useState<Question[]>([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);

  const [searchParams] = useSearchParams();

  const haveMore = total > questionList.length;
  const containerRef = useRef<HTMLDivElement>(null);
  const prevY = useRef<number>(0);
  const loading = true;

  // 如何判断一个元素是否在可视区域中 https://vue3js.cn/interview/JavaScript/visible.html
  function tryLoadMore() {
    // 判断是否向下滑
    if (window.scrollY > prevY.current) {
      const element = containerRef.current;
      if (element == null) return;
      const domRect = element.getBoundingClientRect();
      if (domRect == null) return;
      const { bottom } = domRect;
      const viewHeight =
        window.innerHeight || document.documentElement.clientHeight;
      if (bottom <= viewHeight) {
        console.log(bottom, viewHeight);
        console.log('load more');
      }
    }
    prevY.current = window.scrollY;
  }

  // 1. 监控路由参数
  useEffect(() => {
    tryLoadMore();
  }, [searchParams]);

  // 2.
  useEffect(() => {
    // 绑定
    window.addEventListener('scroll', tryLoadMore);
    // 解绑
    return () => {
      window.removeEventListener('scroll', tryLoadMore);
    };
  }, []);

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
        <div style={{ height: '2000px' }}></div>
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
      <div className={styles.footer}>
        <div ref={containerRef}>Load more</div>
      </div>
    </>
  );
};

export default List;

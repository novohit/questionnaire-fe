/* eslint-disable @typescript-eslint/no-unused-vars */

import React, { FC, useEffect, useRef, useState } from 'react';
import styles from './Common.module.scss';
import QuestionCard from '../../components/QuestionCard';
import { useDebounceFn, useRequest, useTitle } from 'ahooks';
import { Empty, Spin, Typography } from 'antd';
import ListSearch from '../../components/ListSearch';
import { getQuestionList } from '../../services/question';
import { Question } from '../../model';
import useLoadQuestionList from '../../hooks/useLoadQuestionList';
import { useSearchParams } from 'react-router-dom';
import { DEFAULT_PAGE_SIZE, SEARCH_KEY } from '../../constants';

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

  const {
    run: loadMore,
    loading,
    error,
  } = useRequest(
    async () => {
      const data = await getQuestionList({
        keyword: searchParams.get(SEARCH_KEY) || '',
        page,
        size: DEFAULT_PAGE_SIZE,
      });
      return data;
    },
    {
      manual: true,
      onSuccess: res => {
        const { list, total } = res;
        setQuestionList(questionList.concat(list));
        setPage(page + 1);
        setTotal(total);
      },
    }
  );

  // 防抖函数
  const { run: tryLoadMore } = useDebounceFn(
    () => {
      // 如何判断一个元素是否在可视区域中 https://vue3js.cn/interview/JavaScript/visible.html
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
          loadMore();
        }
      }
      prevY.current = window.scrollY;
    },
    { wait: 200 }
  );

  // 1. 监控路由参数
  useEffect(() => {
    tryLoadMore();
  }, [searchParams]);

  // 2. 监听页面滚动
  useEffect(() => {
    // 绑定
    if (haveMore) {
      window.addEventListener('scroll', tryLoadMore);
    }
    // 解绑
    return () => {
      window.removeEventListener('scroll', tryLoadMore);
    };
  }, [searchParams, haveMore]);

  // TODO loading <Spin /> 动画显示在顶部
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
      <div className={styles.footer}>
        <div ref={containerRef}>Load more</div>
      </div>
    </>
  );
};

export default List;

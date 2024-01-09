import React, { FC, useEffect, useRef, useState } from 'react';
import styles from '../Common.module.scss';
import QuestionnaireCard from '../../components/QuestionnaireCard';
import { useDebounceFn, useRequest, useTitle } from 'ahooks';
import { Empty, Spin, Typography } from 'antd';
import ListSearch from '../../components/ListSearch';
import { getQuestionnaires } from '../../services/questionnaire';
import { Questionnaire } from '../../model/questionnaire';
import { useSearchParams } from 'react-router-dom';
import { DEFAULT_PAGE_SIZE, SEARCH_KEY } from '../../constants';

const { Title } = Typography;

const List: FC = () => {
  useTitle('问卷星 - 我的问卷');
  const [questionnaires, setQuestionnaires] = useState<Questionnaire[]>([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);

  const [searchParams] = useSearchParams();

  const haveMore = total > questionnaires.length;
  const containerRef = useRef<HTMLDivElement>(null);
  const prevY = useRef<number>(0);

  const { run: loadMore, loading } = useRequest(
    async (type: string) => {
      let p = page;
      if (type === 'route') {
        p = 1;
      }
      const data = await getQuestionnaires({
        keyword: searchParams.get(SEARCH_KEY) || '',
        page: p,
        size: DEFAULT_PAGE_SIZE,
      });
      return { type, data };
    },
    {
      manual: true,
      onSuccess: res => {
        const { type, data } = res;
        const { list, total } = data;
        setTotal(total);
        if (type === 'scroll') {
          setPage(page + 1);
          setQuestionnaires(questionnaires.concat(list));
        } else {
          setPage(2);
          setQuestionnaires(list);
        }
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
          loadMore('scroll');
        }
      }
      prevY.current = window.scrollY;
    },
    { wait: 200 }
  );

  // 1. 监控路由参数
  useEffect(() => {
    loadMore('route');
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
        {!loading && questionnaires.length === 0 && (
          <Empty description="暂无数据" />
        )}
        {!loading &&
          questionnaires.length > 0 &&
          questionnaires.map(q => {
            const { _id } = q;
            return <QuestionnaireCard key={_id} {...q} />;
          })}
      </div>
      <div className={styles.footer}>
        <div ref={containerRef}>Load more</div>
      </div>
    </>
  );
};

export default List;

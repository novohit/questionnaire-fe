import { Empty, Typography } from 'antd';
import React, { FC } from 'react';
import styles from '../Common.module.scss';
import QuestionnaireCard from '../../components/QuestionnaireCard';
import { useTitle } from 'ahooks';
import ListSearch from '../../components/ListSearch';
import useLoadQuestionnaires from '../../hooks/useLoadQuestionnaires';
import ListPage from '../../components/ListPage';
import { LoadingSpin } from '../../components/common';

const { Title } = Typography;

const Star: FC = () => {
  useTitle('问卷星 - 收藏问卷');

  // const [starList, setStarList] = useState(mockStarList);
  const { data, loading } = useLoadQuestionnaires({ isStar: true });
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
        {loading && <LoadingSpin />}
        {!loading && starList.length === 0 && <Empty description="暂无数据" />}
        {!loading &&
          starList.length > 0 &&
          starList.map(q => {
            const { _id } = q;
            return <QuestionnaireCard key={_id} {...q} />;
          })}
      </div>
      <div className={styles.footer}>{!loading && <ListPage />}</div>
    </>
  );
};

export default Star;

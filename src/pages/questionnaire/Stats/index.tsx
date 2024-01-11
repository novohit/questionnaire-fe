import React, { FC, useState } from 'react';
import useLoadQuestionnaire from '../../../hooks/useLoadQuestionnaire';
import styles from './index.module.scss';
import StatsHeader from './StatsHeader';
import LeftPanel from './LeftPanel';
import NotFound from '../../NotFound';
import { LoadingSpin } from '../../../components/common';
import AnswerList from './AnswerList';
import RightPanel from './RightPanel';
import { useAppSelector } from '../../../hooks/useRedux';
// import PieChartDemo from './PieChartDemo';
// import BarChartDemo from './BarChartDemo';
// import { ResponsiveContainer } from 'recharts';

const Stats: FC = () => {
  const { loading, questionnaire } = useLoadQuestionnaire();

  const { components } = useAppSelector(state => state.componentsState.present);

  // 嵌套层级比较少 共享状态可以用状态提升 selectedId type
  const [selectedId, setSelectedId] = useState('');
  const [selectedType, setSelectedType] = useState('');

  if (!loading && !questionnaire?.isPublished) {
    return <NotFound />;
  }

  const questionnaireId = questionnaire?._id || '';

  return (
    <div className={styles.container}>
      {loading && <LoadingSpin />}
      {!loading && (
        <>
          <StatsHeader
            setSelectedId={setSelectedId}
            setSelectedType={setSelectedType}
          />
          <div className={styles['content-wrapper']}>
            <div className={styles.content}>
              <div className={styles.left}>
                <LeftPanel
                  components={components}
                  selectedId={selectedId}
                  setSelectedId={setSelectedId}
                  setSelectedType={setSelectedType}
                />
              </div>
              <div className={styles.main}>
                <AnswerList
                  questionnaireId={questionnaireId}
                  components={components}
                  selectedId={selectedId}
                  setSelectedId={setSelectedId}
                  setSelectedType={setSelectedType}
                />
              </div>
              <div className={styles.right}>
                {/* <ResponsiveContainer width="100%" height="100%">
                  <div>
                    <PieChartDemo />
                    <BarChartDemo />
                  </div>
                </ResponsiveContainer> */}
                <RightPanel
                  questionnaireId={questionnaireId}
                  selectedId={selectedId}
                  selectedType={selectedType}
                />
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Stats;

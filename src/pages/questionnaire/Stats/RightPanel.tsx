import React, { FC, useEffect, useState } from 'react';
import { getStats } from '../../../services/stats';
import { StatsComponentProps } from '../../../components/questionnaire/type';
import { getStatsComponentByType } from '../../../components/questionnaire/config';

type Props = {
  selectedId: string;
  selectedType: string;
};

const RightPanel: FC<Props> = (props: Props) => {
  const { selectedId, selectedType } = props;
  const [statsData, setStatsData] = useState<StatsComponentProps>();

  useEffect(() => {
    async function get() {
      const data = await getStats({
        questionnaireId: '1',
        userQuestionComponentId: '1',
        type: selectedType,
      });
      setStatsData(data);
      console.log(data);
    }
    get();
  }, [selectedId]);

  const StatsComponent = getStatsComponentByType('radio');

  if (StatsComponent == null) return <></>;

  return (
    <>
      <StatsComponent {...statsData} />
    </>
  );
};

export default RightPanel;

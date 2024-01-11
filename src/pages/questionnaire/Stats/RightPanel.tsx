import React, { FC, useEffect, useState } from 'react';
import { getStats } from '../../../services/stats';
import { StatsData } from '../../../components/questionnaire/type';
import { getStatsComponentByType } from '../../../components/questionnaire/config';
import { Typography } from 'antd';
import PVStats from './PVStats';
import { LoadingSpin } from '../../../components/common';

const { Text } = Typography;

type Props = {
  questionnaireId: string;
  selectedId: string;
  selectedType: string;
};

const RightPanel: FC<Props> = (props: Props) => {
  const { questionnaireId, selectedId, selectedType } = props;
  const [statsData, setStatsData] = useState<StatsData>([]);
  const [loading, setLoading] = useState<boolean>();

  useEffect(() => {
    async function get() {
      setLoading(true);
      const data = await getStats({
        questionnaireId,
        userQuestionComponentId: selectedId,
        type: selectedType,
      });
      setStatsData(data);
      setLoading(false);
    }
    if (selectedId) {
      get();
    }
  }, [selectedId]);

  const StatsComponent = getStatsComponentByType(selectedType);

  if (StatsComponent == null) {
    if (!selectedId) {
      return <PVStats />;
    }
    return (
      <>
        <Text>该类型数据暂不支持统计</Text>
      </>
    );
  }

  return (
    <>
      {loading && <LoadingSpin />}
      {!loading && <StatsComponent data={statsData} />}
    </>
  );
};

export default RightPanel;

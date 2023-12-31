import React, { FC, useEffect, useState } from 'react';
import { getComponentLib } from '../../../services/component';
import { ComponentGroup } from '../../../model/component';
import { QuestionnaireComponent } from '../../../model/questionnaire';
import { Empty, Typography } from 'antd';
import { getComponentByType } from '../../../components/questionnaire/config';
import styles from './ComponentLibTab.module.scss';
import { addComponent } from '../../../store/componentsReducer';
import { nanoid } from '@reduxjs/toolkit';
import { useAppDispatch } from '../../../hooks/useRedux';
import { LoadingSpin } from '../../../components/common';

const { Title } = Typography;

const ComponentLib: FC = () => {
  const [componentLib = [], setComponentLib] =
    useState<Array<ComponentGroup>>();
  const [loading, setLoading] = useState<boolean>(true);

  const dispatch = useAppDispatch();

  useEffect(() => {
    async function get() {
      const resp = await getComponentLib();
      setComponentLib(resp);
      setLoading(false);
    }
    get();
  }, []);

  return (
    <>
      {loading && <LoadingSpin />}
      {!loading && componentLib.length === 0 && (
        <Empty description="组件库为空" />
      )}
      {!loading &&
        componentLib.map((group, index) => {
          const { groupId, groupName, components } = group;
          return (
            <div key={groupId}>
              <Title
                level={3}
                style={{
                  fontSize: '16px',
                  marginTop: index > 0 ? '20px' : '0', // 第一项往上靠
                }}
              >
                {groupName}
              </Title>
              {components.map(c => {
                const { componentId, type, defaultProps } = c;
                const Component = getComponentByType(type);
                if (Component == null) {
                  return <></>;
                }
                const handleClick = () => {
                  // TODO 要处理一下id 否则id为空 暂时用nanoid
                  // 注意 userQuestionComponentId 和 componentId 区别
                  dispatch(
                    addComponent({
                      userQuestionComponentId: nanoid(),
                      componentId,
                      type,
                      title: '',
                      props: defaultProps,
                    } as QuestionnaireComponent)
                  );
                };

                return (
                  <div
                    key={c.componentId}
                    className={styles.wrapper}
                    onClick={handleClick}
                  >
                    <div className={styles.component}>
                      <Component {...defaultProps} />
                    </div>
                  </div>
                );
              })}
            </div>
          );
        })}
    </>
  );
};

export default ComponentLib;

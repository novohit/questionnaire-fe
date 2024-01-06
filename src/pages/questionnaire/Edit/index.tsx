/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { FC } from 'react';
import useLoadQuestionnaire from '../../../hooks/useLoadQuestionnaire';
import styles from './index.module.scss';
import EditCanvas from './EditCanvas';
import { Spin } from 'antd';
import { selectComponent } from '../../../store/componentsReducer';
import LeftPanel from './LeftPanel';
import RightPanel from './RightPanel';
import EditHeader from './EditHeader';
import { useAppDispatch } from '../../../hooks/useRedux';
import { useTitle } from 'ahooks';

const Edit: FC = () => {
  useTitle('问卷星 - 编辑');
  // 用 hooks 抽取公共逻辑
  const { loading, questionnaire } = useLoadQuestionnaire();
  const dispatch = useAppDispatch();

  // 点击空白出 取消选中
  function cannelSelected() {
    dispatch(selectComponent(''));
  }

  return (
    <>
      <div className={styles.container}>
        <EditHeader />
        <div className={styles['content-wrapper']}>
          <div className={styles.content}>
            <div className={styles.left}>
              <LeftPanel />
            </div>
            <div className={styles.main} onClick={cannelSelected}>
              <div className={styles['canvas-wrapper']}>
                <div style={{ height: '900px' }}>
                  画布测试滚动
                  <EditCanvas />
                </div>
              </div>
            </div>
            <div className={styles.right}>
              <RightPanel />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Edit;

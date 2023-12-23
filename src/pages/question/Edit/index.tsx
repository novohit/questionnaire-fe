/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { FC } from 'react';
import useLoadQuestion from '../../../hooks/useLoadQuestion';
import styles from './index.module.scss';
import EditCanvas from './EditCanvas';
import { Spin } from 'antd';
import { useDispatch } from 'react-redux';
import { selectComponent } from '../../../store/components';
import LeftPanel from './LeftPanel';
import RightPanel from './RightPanel';
import EditHeader from './EditHeader';

const Edit: FC = () => {
  // 用 hooks 抽取公共逻辑
  const { loading, question } = useLoadQuestion();
  const dispatch = useDispatch();

  // 点击空白出 取消选中
  function cannelSelected() {
    dispatch(selectComponent(''));
  }

  return (
    <>
      <div className={styles.container}>
        <div>
          <EditHeader />
        </div>
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

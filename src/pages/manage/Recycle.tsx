import { Empty, Table, Tag, Typography } from 'antd';
import React, { FC, useState } from 'react';
import styles from './Common.module.scss';
import { useTitle } from 'ahooks';

const mockRecycleList = [
  {
    _id: 'q8',
    title: '问卷8',
    isPublished: false,
    isStar: true,
    answerCount: 23,
    createdAt: '2023-11-18 15:42:22',
  },
  {
    _id: 'q9',
    title: '问卷9',
    isPublished: true,
    isStar: true,
    answerCount: 3,
    createdAt: '2023-11-18 15:42:22',
  },
];

const columns = [
  {
    title: '标题',
    dataIndex: 'title',
  },
  {
    title: '是否发布',
    dataIndex: 'isPublished',
    render: (isPublished: boolean) => {
      return isPublished ? (
        <Tag color="processing">已发布</Tag>
      ) : (
        <Tag>未发布</Tag>
      );
    },
  },
  {
    title: '是否收藏',
    dataIndex: 'isStar',
    render: (isStar: boolean) => {
      return isStar ? <Tag color="processing">已收藏</Tag> : <Tag>未收藏</Tag>;
    },
  },
  {
    title: '答卷数量',
    dataIndex: 'answerCount',
  },
  {
    title: '创建时间',
    dataIndex: 'createdAt',
  },
];

const { Title } = Typography;

const Recycle: FC = () => {
  useTitle('问卷星 - 回收站');

  const [recycleList, setRecycleList] = useState(mockRecycleList);
  console.log(recycleList, setRecycleList);

  return (
    <>
      <div className={styles.header}>
        <div className={styles.left}>
          <Title level={3}>回收站</Title>
        </div>
        <div className={styles.right}>(搜索)</div>
      </div>
      <div className={styles.content}>
        {recycleList.length === 0 && <Empty description="暂无数据" />}
        {recycleList.length > 0 && (
          <Table
            dataSource={recycleList}
            columns={columns}
            pagination={false}
          />
        )}
      </div>
      <div className={styles.footer}>分页</div>
    </>
  );
};

export default Recycle;

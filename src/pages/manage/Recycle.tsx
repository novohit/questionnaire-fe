/* eslint-disable @typescript-eslint/no-unused-vars */
import { Button, Empty, Space, Spin, Table, Tag, Typography } from 'antd';
import React, { FC, useState } from 'react';
import styles from './Common.module.scss';
import { useTitle } from 'ahooks';
import { ColumnsType } from 'antd/es/table';
import ListSearch from '../../components/ListSearch';
import useLoadQuestionList from '../../hooks/useLoadQuestionList';

interface Question {
  _id: string;
  title: string;
  isPublished: boolean;
  isStar: boolean;
  answerCount: number;
  createdAt: string;
}

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

const columns: ColumnsType<Question> = [
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
  {
    title: '操作',
    dataIndex: 'operation',
    // render 第二个参数可以拿到每一行的对象信息
    render: (_, record) => {
      return (
        <>
          <Space>
            <Button type="text" size="small">
              恢复 {record._id}
            </Button>
            <Button danger type="link" size="small">
              彻底删除
            </Button>
          </Space>
        </>
      );
    },
  },
];

const { Title } = Typography;

const Recycle: FC = () => {
  useTitle('问卷星 - 回收站');

  // const [recycleList, setRecycleList] = useState(mockRecycleList);
  // console.log(recycleList, setRecycleList);

  const [selectedIds, setSelectedIds] = useState<React.Key[]>([]);
  const { data, loading, error } = useLoadQuestionList({ isRecycle: true });
  const recycleList = data?.list || [];

  function onSelectChange(selectedIds: React.Key[]) {
    setSelectedIds(selectedIds);
  }

  return (
    <>
      <div className={styles.header}>
        <div className={styles.left}>
          <Title level={3}>回收站</Title>
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
        {!loading && recycleList.length === 0 && (
          <Empty description="暂无数据" />
        )}
        {!loading && recycleList.length > 0 && (
          <Table
            rowKey={q => q._id}
            dataSource={recycleList}
            rowSelection={{
              selectedRowKeys: selectedIds,
              onChange: onSelectChange,
            }}
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

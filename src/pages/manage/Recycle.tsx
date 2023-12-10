/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Button,
  Empty,
  Modal,
  Space,
  Spin,
  Table,
  Tag,
  Typography,
  message,
} from 'antd';
import React, { FC, useState } from 'react';
import styles from './Common.module.scss';
import { useRequest, useTitle } from 'ahooks';
import { ColumnsType } from 'antd/es/table';
import ListSearch from '../../components/ListSearch';
import useLoadQuestionList from '../../hooks/useLoadQuestionList';
import ListPage from '../../components/ListPage';
import { deleteQuestion, recoverQuestion } from '../../services/question';
import { ExclamationCircleFilled } from '@ant-design/icons';

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
    title: '删除时间',
    dataIndex: 'deletedAt',
  },
  // 用原生的onClick，这里拿不到selectedId 无法操作 得封装起来
  // {
  //   title: '操作',
  //   dataIndex: 'operation',
  //   // render 第二个参数可以拿到每一行的对象信息
  //   render: (_, record) => {
  //     return (
  //       <>
  //         <Space>
  //           <Button type="text" size="small">
  //             恢复 {record._id}
  //           </Button>
  //           <Button danger type="link" size="small">
  //             彻底删除
  //           </Button>
  //         </Space>
  //       </>
  //     );
  //   },
  // },
];

const { Title } = Typography;
const { confirm } = Modal;

const Recycle: FC = () => {
  useTitle('问卷星 - 回收站');

  // const [recycleList, setRecycleList] = useState(mockRecycleList);
  // console.log(recycleList, setRecycleList);

  const [selectedIds, setSelectedIds] = useState<React.Key[]>([]);
  const { data, loading, error, refresh } = useLoadQuestionList({
    isDeleted: true,
  });
  const recycleList = data?.list || [];

  const { loading: recoverLoading, run: recover } = useRequest(
    async () => {
      await recoverQuestion(selectedIds);
    },
    {
      manual: true,
      onSuccess() {
        message.success('恢复成功');
        // 手动刷新列表
        refresh();
        setSelectedIds([]);
      },
    }
  );

  const { loading: deleteLoading, run: deleteRequest } = useRequest(
    async () => {
      await deleteQuestion(selectedIds);
    },
    {
      manual: true,
      onSuccess() {
        message.success('删除成功');
        // 手动刷新列表
        refresh();
        setSelectedIds([]);
      },
    }
  );

  function deleteConfirm() {
    confirm({
      title: '确认删除该问卷？',
      icon: <ExclamationCircleFilled />,
      content: '删除后无法恢复',
      okText: '确认',
      cancelText: '取消',
      onOk() {
        deleteRequest();
      },
      onCancel() {},
    });
  }

  function onSelectChange(selectedIds: React.Key[]) {
    setSelectedIds(selectedIds);
  }

  return (
    <>
      <div className={styles.header}>
        <div className={styles.left}>
          <Title level={3}>回收站</Title>
          <Space>
            <Button
              type="primary"
              disabled={selectedIds.length === 0 || recoverLoading}
              onClick={recover}
            >
              恢复
            </Button>
            <Button
              danger
              disabled={selectedIds.length === 0 || deleteLoading}
              onClick={deleteConfirm}
            >
              彻底删除
            </Button>
          </Space>
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
      <div className={styles.footer}>
        {!loading && recycleList.length > 0 && <ListPage />}
      </div>
    </>
  );
};

export default Recycle;

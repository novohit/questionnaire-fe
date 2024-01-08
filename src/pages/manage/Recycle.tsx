import {
  Button,
  Empty,
  Modal,
  Space,
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
import useLoadQuestionnaires from '../../hooks/useLoadQuestionnaires';
import ListPage from '../../components/ListPage';
import {
  deleteQuestionnaire,
  recoverQuestionnaire,
} from '../../services/questionnaire';
import { ExclamationCircleFilled } from '@ant-design/icons';
import { LoadingSpin } from '../../components/common';
import { Questionnaire } from '../../model/questionnaire';

const columns: ColumnsType<Questionnaire> = [
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
  const { data, loading, refresh } = useLoadQuestionnaires({
    isDeleted: true,
  });
  const recycleList = data?.list || [];

  const { loading: recoverLoading, run: recover } = useRequest(
    async () => {
      await recoverQuestionnaire(selectedIds);
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
      await deleteQuestionnaire(selectedIds);
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
        {loading && <LoadingSpin />}
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

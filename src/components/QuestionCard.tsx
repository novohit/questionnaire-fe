import React, { FC, useState } from 'react';
import styles from './QuestionCard.module.scss';
import { Button, Divider, Modal, Popconfirm, Space, Tag, message } from 'antd';
import {
  CopyOutlined,
  DeleteOutlined,
  EditOutlined,
  ExclamationCircleFilled,
  LineChartOutlined,
  StarOutlined,
  StarTwoTone,
} from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';
import { useRequest } from 'ahooks';
import { copyQuestion, updateQuestion } from '../services/question';
import dayjs from 'dayjs';

// ts 自定义类型
type PropsType = {
  _id: string;
  title: string;
  isPublished: boolean;
  isStar: boolean;
  answerCount: number;
  createdAt: string;
};

const { confirm } = Modal;

const QuestionCard: FC<PropsType> = (props: PropsType) => {
  const { _id, title, answerCount, isPublished, isStar, createdAt } = props;
  // 修改数据后是否重新加载列表？还是本地维护状态 两种做法
  // 更新收藏后，不加载list接口，直接修改页面 维护star的状态
  const [starState, setStarState] = useState(isStar);
  const [deleteState, setDeleteState] = useState(false);

  const nav = useNavigate();

  const { loading: copyLoading, run: copy } = useRequest(
    async () => await copyQuestion(_id),
    {
      manual: true,
      onSuccess(_id) {
        message.success('复制成功');
        nav(`/question/edit/${_id}`);
      },
    }
  );

  const { loading: deleteLoading, run: deleteRequest } = useRequest(
    async () =>
      await updateQuestion(_id, {
        deletedAt: dayjs().format('YYYY-MM-DD HH:mm:ss'),
      }),
    {
      manual: true,
      onSuccess() {
        setDeleteState(true);
        message.success('删除成功');
      },
    }
  );

  const { loading: starLoading, run: updateStar } = useRequest(
    async () => {
      await updateQuestion(_id, {
        isStar: !isStar,
      });
    },
    {
      manual: true,
      onSuccess() {
        setStarState(!starState);
        message.success('更新成功');
      },
    }
  );

  function deleteConfirm() {
    confirm({
      title: '确认删除该问卷？',
      icon: <ExclamationCircleFilled />,
      content: '删除后可从回收站恢复',
      okText: '确认',
      cancelText: '取消',
      onOk() {
        deleteRequest();
      },
      onCancel() {},
    });
  }

  if (deleteState) return null;

  return (
    <>
      <div className={styles.container}>
        <div className={styles.title}>
          <div className={styles.left}>
            <Space>
              {starState && (
                <StarTwoTone
                  // twoToneColor="gray"
                  onClick={updateStar}
                />
              )}
              <Link to={`/question/edit/${_id}`}>{title}</Link>
            </Space>
          </div>
          <div className={styles.right}>
            <Space direction="horizontal">
              {isPublished ? (
                <Tag color="processing">已发布</Tag>
              ) : (
                <Tag>未发布</Tag>
              )}
              <span>{createdAt}</span>
              <span>答卷：{answerCount}</span>
              <span>{createdAt}</span>
            </Space>
          </div>
        </div>
        <Divider style={{ margin: '12px 0' }} />
        <div className={styles['button-container']}>
          <div className={styles.left}>
            <Space direction="horizontal">
              <Button
                type="text"
                icon={<EditOutlined />}
                onClick={() => {
                  nav(`/question/edit/${_id}`);
                }}
              >
                编辑问卷
              </Button>
              <Button
                type="text"
                icon={<LineChartOutlined />}
                disabled={!isPublished} // 未发布问卷的禁用统计按钮
                onClick={() => {
                  nav(`/question/stats/${_id}`);
                }}
              >
                数据统计
              </Button>
            </Space>
          </div>
          <div className={styles.right}>
            <Space>
              <Button
                type="text"
                icon={<StarOutlined />}
                onClick={updateStar}
                disabled={starLoading}
              >
                {starState ? '取消收藏' : '点击收藏'}
              </Button>
              <Popconfirm
                title="确认复制该问卷"
                onConfirm={copy}
                okText="确认"
                cancelText="取消"
              >
                <Button
                  type="text"
                  icon={<CopyOutlined />}
                  disabled={copyLoading}
                >
                  复制
                </Button>
              </Popconfirm>
              <Button
                type="text"
                icon={<DeleteOutlined />}
                onClick={deleteConfirm}
                disabled={deleteLoading}
              >
                删除
              </Button>
            </Space>
          </div>
        </div>
      </div>
    </>
  );
};

export default QuestionCard;

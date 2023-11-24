import React, { FC } from 'react';
import styles from './QuestionCard.module.scss';
import { Button, Divider, Space, Tag } from 'antd';
import {
  CopyOutlined,
  DeleteOutlined,
  EditOutlined,
  LineChartOutlined,
  StarOutlined,
  StarTwoTone,
} from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';

// ts 自定义类型
type PropsType = {
  _id: string;
  title: string;
  isPublished: boolean;
  isStar: boolean;
  answerCount: number;
  createdAt: string;
};

const QuestionCard: FC<PropsType> = (props: PropsType) => {
  const { _id, title, answerCount, isPublished, isStar, createdAt } = props;
  const nav = useNavigate();

  console.log(_id);
  return (
    <>
      <div className={styles.container}>
        <div className={styles.title}>
          <div className={styles.left}>
            <Space>
              {isStar && (
                <StarTwoTone
                  // twoToneColor="gray"
                  onClick={() => {
                    console.log('标星');
                  }}
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
              <Button type="text" icon={<StarOutlined />} onClick={() => {}}>
                {isStar ? '取消收藏' : '点击收藏'}
              </Button>
              <Button type="text" icon={<CopyOutlined />} onClick={() => {}}>
                复制
              </Button>
              <Button type="text" icon={<DeleteOutlined />} onClick={() => {}}>
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

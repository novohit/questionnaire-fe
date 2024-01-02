import React, { FC, useState } from 'react';
import styles from './EditHeader.module.scss';
import { Button, Input, Space, Typography } from 'antd';
import { EditOutlined, LeftOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import EditMainToolbar from './EditMainToolbar';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../store';
import { resetPageSetting } from '../../../store/pageInfoReducer';

const { Title } = Typography;

const EditHeader: FC = () => {
  const nav = useNavigate();

  return (
    <div className={styles['header-wrapper']}>
      <div className={styles.header}>
        <div className={styles.left}>
          <Space direction="horizontal">
            <Button
              type="link"
              icon={<LeftOutlined />}
              onClick={() => {
                nav(-1);
              }}
            >
              返回
            </Button>
            <QuestionTitle />
          </Space>
        </div>
        <div className={styles.main}>
          <EditMainToolbar />
        </div>
        <div className={styles.right}>
          <Space direction="horizontal">
            <Button>保存</Button>
            <Button type="primary">发布</Button>
          </Space>
        </div>
      </div>
    </div>
  );
};

const QuestionTitle: FC = () => {
  const pageSetting = useSelector((state: RootState) => state.pageSetting);
  const dispatch = useDispatch();
  const { title } = pageSetting;

  const [isEditing, setIsEditing] = useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newTitle = event.target.value.trim();
    dispatch(resetPageSetting({ ...pageSetting, title: newTitle }));
  };

  if (isEditing) {
    return (
      <Input
        autoFocus
        value={title}
        onPressEnter={() => {
          setIsEditing(false);
        }}
        onBlur={() => {
          setIsEditing(false);
        }}
        onChange={handleChange}
      />
    );
  }

  return (
    <Space>
      <Title>{title}</Title>
      <Button
        type="text"
        icon={<EditOutlined />}
        onClick={() => {
          setIsEditing(true);
        }}
      />
    </Space>
  );
};

export default EditHeader;

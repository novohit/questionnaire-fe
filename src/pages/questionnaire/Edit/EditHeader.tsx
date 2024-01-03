import React, { FC, useState } from 'react';
import styles from './EditHeader.module.scss';
import { Button, Input, Space, Typography, message } from 'antd';
import { EditOutlined, LeftOutlined } from '@ant-design/icons';
import { useNavigate, useParams } from 'react-router-dom';
import EditMainToolbar from './EditMainToolbar';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../store';
import { resetPageSetting } from '../../../store/pageInfoReducer';
import { useDebounceEffect, useKeyPress, useRequest } from 'ahooks';
import { updateQuestionnaire } from '../../../services/questionnaire';

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
            <QuestionnaireTitle />
          </Space>
        </div>
        <div className={styles.main}>
          <EditMainToolbar />
        </div>
        <div className={styles.right}>
          <Space direction="horizontal">
            <SaveButton />
            <Button type="primary">发布</Button>
          </Space>
        </div>
      </div>
    </div>
  );
};

// 保存按钮组件
const SaveButton: FC = () => {
  const pageSetting = useSelector((state: RootState) => state.pageSetting);
  const { components } = useSelector(
    (state: RootState) => state.componentsState
  );
  const { _id } = useParams();

  const { loading, run } = useRequest(
    async () => {
      if (!_id) return;
      await updateQuestionnaire(_id, {
        title: pageSetting.title,
        pageSetting,
        components,
      });
    },
    {
      manual: true,
      onSuccess() {
        message.success('保存成功');
      },
    }
  );

  // 快捷键保存
  useKeyPress(['ctrl.s', 'meta.s'], (event: KeyboardEvent) => {
    // 阻止键盘事件的默认行为 避免跟浏览器快捷键冲突
    event.preventDefault();
    if (!loading) run();
  });

  // 编辑后自动延时5s保存
  // TODO BUG 第一次渲染页面会触发
  useDebounceEffect(
    () => {
      run();
    },
    [pageSetting, components],
    { wait: 5000 }
  );

  return (
    <Button onClick={run} loading={loading}>
      保存
    </Button>
  );
};

// 问卷标题组件
const QuestionnaireTitle: FC = () => {
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

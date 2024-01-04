import {
  BlockOutlined,
  CopyOutlined,
  DeleteOutlined,
  EyeInvisibleOutlined,
  LockOutlined,
  RedoOutlined,
  UndoOutlined,
} from '@ant-design/icons';
import { Button, Space, Tooltip } from 'antd';
import React, { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  copyComponent,
  deleteComponent,
  hideComponent,
  lockComponent,
  pasteComponent,
} from '../../../store/components';
import { RootState } from '../../../store';
import { ActionCreators as UndoActionCreators } from 'redux-undo';

const EditMainToolbar: FC = () => {
  const componentsState = useSelector(
    (state: RootState) => state.componentsState.present
  );

  // 判断大于1的逻辑 因为 redux @@INIT 是空
  const canUndo =
    useSelector((state: RootState) => state.componentsState.past.length) > 1;
  const canRedo =
    useSelector((state: RootState) => state.componentsState.future.length) > 0;

  const dispatch = useDispatch();
  const { selectedId, components, copiedComponent } = componentsState;
  const selectedComponent = components.find(
    c => c.userQuestionComponentId === selectedId
  );

  const handleDelete = () => {
    dispatch(deleteComponent());
  };

  const handleHidden = () => {
    dispatch(hideComponent(selectedId));
  };

  const handleLocked = () => {
    dispatch(lockComponent(selectedId));
  };

  const handleCopy = () => {
    dispatch(copyComponent());
  };

  const handlePaste = () => {
    dispatch(pasteComponent());
  };

  const handleUndo = () => {
    dispatch(UndoActionCreators.undo());
  };

  const handleRedo = () => {
    dispatch(UndoActionCreators.redo());
  };

  return (
    <Space>
      <Tooltip title="删除">
        <Button
          disabled={selectedComponent?.locked}
          shape="circle"
          icon={<DeleteOutlined />}
          onClick={handleDelete}
        />
      </Tooltip>
      <Tooltip title="隐藏">
        <Button
          type={selectedComponent?.hidden ? 'primary' : 'default'}
          shape="circle"
          icon={<EyeInvisibleOutlined />}
          onClick={handleHidden}
        />
      </Tooltip>
      <Tooltip title="锁定">
        <Button
          type={selectedComponent?.locked ? 'primary' : 'default'}
          shape="circle"
          icon={<LockOutlined />}
          onClick={handleLocked}
        />
      </Tooltip>
      <Tooltip title="复制">
        <Button shape="circle" icon={<CopyOutlined />} onClick={handleCopy} />
      </Tooltip>
      <Tooltip title="粘贴">
        <Button
          type={selectedComponent?.locked ? 'primary' : 'default'}
          disabled={copiedComponent == null}
          shape="circle"
          icon={<BlockOutlined />}
          onClick={handlePaste}
        />
      </Tooltip>
      <Tooltip title="撤销">
        <Button
          shape="circle"
          icon={<UndoOutlined />}
          onClick={handleUndo}
          disabled={!canUndo}
        ></Button>
      </Tooltip>
      <Tooltip title="重做">
        <Button
          shape="circle"
          icon={<RedoOutlined />}
          onClick={handleRedo}
          disabled={!canRedo}
        ></Button>
      </Tooltip>
    </Space>
  );
};

export default EditMainToolbar;

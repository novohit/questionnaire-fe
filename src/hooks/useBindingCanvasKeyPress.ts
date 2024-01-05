import { useKeyPress } from 'ahooks';
import {
  copyComponent,
  deleteComponent,
  pasteComponent,
  selectComponent,
} from '../store/componentsReducer';
import { useAppDispatch, useAppSelector } from './useRedux';
import { ActionCreators as UndoActionCreators } from 'redux-undo';

function isComponentElement() {
  // 防止光标 focus 到属性输入框时删掉组件
  const activeElem = document.activeElement;
  if (activeElem === document.body) return true;
  // TODO 使用 dnd-kit 后元素变成了div
  if (activeElem?.matches('div[role="button"]')) return true;
  return false;
}

function useBindingCanvasKeypress() {
  const dispatch = useAppDispatch();
  const componentsState = useAppSelector(
    state => state.componentsState.present
  );
  const { selectedId, components } = componentsState;

  // 判断大于1的逻辑 因为 redux @@INIT 是空
  const canUndo =
    useAppSelector(state => state.componentsState.past.length) > 1;
  const canRedo =
    useAppSelector(state => state.componentsState.future.length) > 0;

  // 删除
  useKeyPress(['backspace', 'delete'], () => {
    if (!isComponentElement()) return;
    dispatch(deleteComponent());
  });

  // 复制
  useKeyPress(['ctrl.c', 'meta.c'], () => {
    if (!isComponentElement()) return;
    dispatch(copyComponent());
  });

  // 粘贴
  useKeyPress(['ctrl.v', 'meta.v'], () => {
    if (!isComponentElement()) return;
    dispatch(pasteComponent());
  });

  // 快速粘贴
  useKeyPress(['ctrl.d', 'meta.d'], (event: KeyboardEvent) => {
    // 阻止键盘事件的默认行为 避免跟浏览器快捷键冲突
    event.preventDefault();
    if (!isComponentElement()) return;
    dispatch(copyComponent());
    dispatch(pasteComponent());
  });

  // 上移选中
  useKeyPress(['uparrow'], (event: KeyboardEvent) => {
    // 阻止键盘事件的默认行为 避免同时移动scroll
    event.preventDefault();
    if (!isComponentElement()) return;
    const index = components.findIndex(
      c => c.userQuestionComponentId === selectedId
    );
    const prevIndex = Math.max(index - 1, 0);
    dispatch(selectComponent(components[prevIndex].userQuestionComponentId));
  });

  // 下移选中
  useKeyPress(['downarrow'], (event: KeyboardEvent) => {
    // 阻止键盘事件的默认行为 避免同时移动scroll
    event.preventDefault();
    if (!isComponentElement()) return;
    const index = components.findIndex(
      c => c.userQuestionComponentId === selectedId
    );
    const nextIndex = Math.min(index + 1, components.length - 1);
    dispatch(selectComponent(components[nextIndex].userQuestionComponentId));
  });

  // 撤销
  useKeyPress(['ctrl.z', 'meta.z'], () => {
    if (canUndo) {
      dispatch(UndoActionCreators.undo());
    }
  });

  // 重做
  useKeyPress(['ctrl.y', 'meta.y'], () => {
    if (canRedo) {
      dispatch(UndoActionCreators.redo());
    }
  });
}

export default useBindingCanvasKeypress;

import { useKeyPress } from 'ahooks';
import { useDispatch, useSelector } from 'react-redux';
import {
  copyComponent,
  deleteComponent,
  pasteComponent,
  selectComponent,
} from '../store/components';
import { RootState } from '../store';

function isComponentElement() {
  // 防止光标 focus 到属性输入框时删掉组件
  const activeElem = document.activeElement;
  if (activeElem === document.body) return true;
  return false;
}

function useBindingCanvasKeypress() {
  const dispatch = useDispatch();
  const componentsState = useSelector(
    (state: RootState) => state.componentsState
  );
  const { selectedId, components } = componentsState;

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
}

export default useBindingCanvasKeypress;

import { PayloadAction, createSlice, nanoid } from '@reduxjs/toolkit';
import { RootState } from '..';
import { ComponentProps } from '../../model';
import cloneDeep from 'lodash.clonedeep';

// 为 slice state 定义一个类型
interface ComponentState {
  userQuestionComponentId: string;
  componentId: string;
  type: string;
  title: string;
  hidden: boolean;
  locked: boolean;
  props: ComponentProps;
}

interface ComponentsState {
  selectedId: string; // 选中蓝色高亮的状态
  components: ComponentState[];
  copiedComponent?: ComponentState;
}

// 使用该类型定义初始 state
const initialState: ComponentsState = {
  selectedId: '',
  components: [],
};

export const componentsSlice = createSlice({
  name: 'componentsState',
  initialState,
  reducers: {
    resetComponents(state, action: PayloadAction<ComponentsState>) {
      return action.payload;
    },
    selectComponent: (state, action: PayloadAction<string>) => {
      state.selectedId = action.payload;
    },
    addComponent: (state, action: PayloadAction<ComponentState>) => {
      const newComponent = action.payload;
      const { selectedId, components } = state;
      if (!selectedId) {
        // 未选中任何组件 直接新建到最后
        //
        components.push(newComponent);
      } else {
        // 插入到选中组件的下一个
        const index = components.findIndex(
          c => c.userQuestionComponentId === selectedId
        );
        components.splice(index + 1, 0, newComponent);
      }
      state.selectedId = newComponent.userQuestionComponentId;
    },
    updateComponent: (
      state,
      action: PayloadAction<{
        userQuestionComponentId: string;
        newProps: ComponentProps;
      }>
    ) => {
      const { userQuestionComponentId, newProps } = action.payload;
      const old = state.components.find(
        c => c.userQuestionComponentId == userQuestionComponentId
      );
      if (old) {
        old.props = {
          ...old.props,
          ...newProps,
        };
      }
    },
    updateComponentTitle: (
      state,
      action: PayloadAction<{
        userQuestionComponentId: string;
        newTitle: string;
      }>
    ) => {
      const { userQuestionComponentId, newTitle } = action.payload;
      const old = state.components.find(
        c => c.userQuestionComponentId == userQuestionComponentId
      );
      if (old) {
        old.title = newTitle;
      }
    },
    // 删除选中的组件
    deleteComponent: state => {
      const { selectedId, components } = state;
      if (!selectedId) {
        return state;
      }
      const index = components.findIndex(
        c => c.userQuestionComponentId === selectedId
      );
      // 删除前selectId下移或者设置为空
      if (index === components.length - 1) {
        // 删除的是最后一个
        state.selectedId = '';
      } else {
        state.selectedId = components[index + 1].userQuestionComponentId;
      }
      components.splice(index, 1);
    },
    // 隐藏/显示组件
    hideComponent: (state, action: PayloadAction<string>) => {
      const { selectedId, components } = state;
      const id = action.payload;

      if (!id) {
        return state;
      }
      const index = components.findIndex(c => c.userQuestionComponentId === id);
      // 有两个地方会调用 组件层次Tab触发时不需要更改selectedId
      if (id === selectedId) {
        // 隐藏前selectId下移或者设置为空
        if (index === components.length - 1) {
          // 隐藏的是最后一个
          state.selectedId = '';
        } else {
          state.selectedId = components[index + 1].userQuestionComponentId;
        }
      }

      const old = components[index].hidden;
      components[index].hidden = !old;
    },
    // 锁定/解锁组件
    lockComponent: (state, action: PayloadAction<string>) => {
      const { components } = state;
      const id = action.payload;

      if (!id) {
        return state;
      }
      const index = components.findIndex(c => c.userQuestionComponentId === id);
      const old = components[index].locked;
      components[index].locked = !old;
    },
    // 复制选中的组件
    copyComponent: state => {
      const { selectedId, components } = state;
      if (!selectedId) {
        return state;
      }
      const index = components.findIndex(
        c => c.userQuestionComponentId === selectedId
      );
      // 深拷贝
      state.copiedComponent = cloneDeep(components[index]);
    },
    // 粘贴组件
    pasteComponent: state => {
      const { selectedId, components } = state;
      if (!state.copiedComponent) {
        return state;
      }
      // 注意是粘贴的时候重新生成id
      state.copiedComponent.userQuestionComponentId = nanoid();
      if (!selectedId) {
        // 未选中任何组件 直接粘贴到最后
        components.push(state.copiedComponent);
      } else {
        // 粘贴到选中组件的下一个
        const index = components.findIndex(
          c => c.userQuestionComponentId === selectedId
        );
        components.splice(index + 1, 0, state.copiedComponent);
      }
    },
  },
});
// 每个 case reducer 函数会生成对应的 Action creators
export const {
  resetComponents,
  selectComponent,
  addComponent,
  updateComponent,
  updateComponentTitle,
  deleteComponent,
  hideComponent,
  lockComponent,
  copyComponent,
  pasteComponent,
} = componentsSlice.actions;
// 选择器等其他代码可以使用导入的 `RootState` 类型
export const selectCount = (state: RootState) => state.componentsState;

export default componentsSlice.reducer;

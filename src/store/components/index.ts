import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { RootState } from '..';
import { ComponentProps } from '../../model';

// 为 slice state 定义一个类型
interface ComponentState {
  componentId: string;
  type: string;
  title: string;
  props: ComponentProps;
}

interface ComponentsState {
  selectedId: string; // 选中蓝色高亮的状态
  components: ComponentState[];
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
        const index = components.findIndex(c => c.componentId === selectedId);
        components.splice(index + 1, 0, newComponent);
      }
      state.selectedId = newComponent.componentId;
    },
  },
});
// 每个 case reducer 函数会生成对应的 Action creators
export const { resetComponents, selectComponent, addComponent } =
  componentsSlice.actions;
// 选择器等其他代码可以使用导入的 `RootState` 类型
export const selectCount = (state: RootState) => state.componentsState;

export default componentsSlice.reducer;

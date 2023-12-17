import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { RootState } from '..';
import { ComponentProps } from '../../model';

// 为 slice state 定义一个类型
interface ComponentState {
  _id: string;
  type: string;
  title: string;
  props: ComponentProps;
}

// 使用该类型定义初始 state
const initialState: ComponentState[] = [];

export const componentsSlice = createSlice({
  name: 'components',
  initialState,
  reducers: {
    resetComponents(state, action: PayloadAction<ComponentState[]>) {
      return action.payload;
    },
    test() {
      return initialState;
    },
  },
});
// 每个 case reducer 函数会生成对应的 Action creators
export const { resetComponents, test } = componentsSlice.actions;
// 选择器等其他代码可以使用导入的 `RootState` 类型
export const selectCount = (state: RootState) => state.user;

export default componentsSlice.reducer;

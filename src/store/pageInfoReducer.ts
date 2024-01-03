import { PayloadAction, createSlice } from '@reduxjs/toolkit';

// 为 slice state 定义一个类型
interface PageSettingState {
  title: string;
  desc: string;
  js?: string;
  css?: string;
}

// 使用该类型定义初始 state
const initialState: PageSettingState = {
  title: '',
  desc: '',
};

export const pageSettingSlice = createSlice({
  name: 'pageSetting',
  initialState,
  reducers: {
    resetPageSetting(state, action: PayloadAction<PageSettingState>) {
      return action.payload;
    },
  },
});
// 每个 case reducer 函数会生成对应的 Action creators
export const { resetPageSetting } = pageSettingSlice.actions;

export default pageSettingSlice.reducer;

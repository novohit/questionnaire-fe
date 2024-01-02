import { PayloadAction, createSlice } from '@reduxjs/toolkit';

// 为 slice state 定义一个类型
interface UserState {
  _id: string;
  username: string;
  age: number;
  email: string;
}

// 使用该类型定义初始 state
const initialState: UserState = {
  _id: '',
  username: '',
  age: 0,
  email: '',
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    loginReducer(state, action: PayloadAction<UserState>) {
      return action.payload;
    },
    logoutReducer() {
      return initialState;
    },
  },
});
// 每个 case reducer 函数会生成对应的 Action creators
export const { loginReducer, logoutReducer } = userSlice.actions;

export default userSlice.reducer;

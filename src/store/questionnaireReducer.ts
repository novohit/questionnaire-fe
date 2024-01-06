import { PayloadAction, createSlice } from '@reduxjs/toolkit';

// 问卷的基础信息
interface QuestionnaireState {
  _id: string;
  title: string;
  isPublished: boolean;
  isStar: boolean;
  answerCount: number;
  url: string;
  createdAt: string;
  deletedAt: string;
}

// 使用该类型定义初始 state
const initialState: QuestionnaireState = {
  _id: '',
  title: '',
  isPublished: false,
  isStar: false,
  answerCount: 0,
  url: '',
  createdAt: '',
  deletedAt: '',
};

export const questionnaireSlice = createSlice({
  name: 'questionnaireReducer',
  initialState,
  reducers: {
    resetQuestionnaire(state, action: PayloadAction<QuestionnaireState>) {
      return action.payload;
    },
  },
});
// 每个 case reducer 函数会生成对应的 Action creators
export const { resetQuestionnaire } = questionnaireSlice.actions;

export default questionnaireSlice.reducer;

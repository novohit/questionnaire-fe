import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userReducer';
import componentsReducer from './components';
import pageSettingReducer from './pageSettingReducer';
import undoable, { excludeAction } from 'redux-undo';

const store = configureStore({
  reducer: {
    user: userReducer,
    componentsState: undoable(componentsReducer, {
      limit: 20,
      filter: excludeAction([
        'componentsState/resetComponents',
        'componentsState/selectComponent',
      ]),
    }),
    pageSetting: pageSettingReducer,
  },
});

// 从 store 本身推断出 `RootState` 和 `AppDispatch` 类型
export type RootState = ReturnType<typeof store.getState>;
// 推断出类型: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export default store;

import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import logger from 'redux-logger';
import { modalSlice } from '../redux/modal/modalSlice';
import { userSlice } from '../redux/user/userSlice';
import { myPage } from '../redux/user/myPage';
import { qnaSlice } from '../redux/post/qnaSlice';
import { rehomingSlice } from '../redux/post/rehomingSlice';
import { postSlice } from '../redux/post/postSlice';
import { commonSlice } from '../redux/post/commonSlice';
import { postDetailSlice } from '../redux/post/PostDetailSlice';
import { postListSlice } from '../redux/post/PostListSlice';

const rootReducer = combineReducers({
  modal: modalSlice.reducer,
  user: userSlice.reducer,
  mypage: myPage.reducer,
  qna: qnaSlice.reducer,
  rehoming: rehomingSlice.reducer,
  post: postSlice.reducer,
  common: commonSlice.reducer,
  postDetail: postDetailSlice.reducer, // 단일 게시글 관련 리듀서
  postList: postListSlice.reducer, // 다중 게시글 관련 리듀서
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat(logger),
  devTools: process.env.NODE_ENV !== 'production',
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();

export default store;

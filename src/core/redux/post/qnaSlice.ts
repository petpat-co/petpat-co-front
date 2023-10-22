import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { mypageAPI, qnaAPI } from 'src/network/api';
import { Post } from 'src/types/post';

export const initialState: Post.QnaState = {
  list: [],
  post: {
    qnaImage: [],
    postId: '',
    postType: '',
    title: '',
    username: '',
    description: '',
    createdAt: '',
    updatedAt: '',
    isBookmark: false,
    isCompleted: false,
    viewCount: '',
    bookMark: '',
  },
};

export const getQnaListApi = createAsyncThunk(
  'qna/list',
  async (pageNo: number, thunkAPI) => {
    try {
      const response = await qnaAPI.getQnaList({ pageNo });
      console.log('getQnaListApi response : ', response.data);
      const list = response.data;
      thunkAPI.dispatch(qnaSlice.actions.setQnaList(list));
    } catch (error: any) {
      console.log('getQnaListApi : error response', error.response.data);
    }
  },
);

export const getQnaDetailApi = createAsyncThunk(
  'qna/detail',
  async (postNo: string, thunkAPI) => {
    try {
      const response = await qnaAPI.getQnaDetail({ postNo });
      console.log('getQnaDetailApi response : ', response.data);
      const detail = response.data;
      thunkAPI.dispatch(qnaSlice.actions.setQnaList(detail));
    } catch (error: any) {
      console.log('getQnaDetailApi : error response', error.response.data);
    }
  },
);

export const postQnaApi = createAsyncThunk(
  'qna/detail',
  async (postdata: FormData, thunkAPI) => {
    try {
      const response = await qnaAPI.postQna(postdata);
      console.log('postQnaApi response : ', response.data);
    } catch (error: any) {
      console.log('postQnaApi : error response', error.response.data);
    }
  },
);

export const modifyQnaApi = createAsyncThunk(
  'qna/detail',
  async (postdata, thunkAPI) => {
    try {
      const response = await qnaAPI.modifyQna(postdata);
      console.log('deleteQnaApi response : ', response.data);
    } catch (error: any) {
      console.log('deleteQnaApi : error response', error.response.data);
    }
  },
);

export const deleteQnaApi = createAsyncThunk(
  'qna/detail',
  async (postNo: string, thunkAPI) => {
    try {
      const response = await qnaAPI.deleteQna({ postNo });
      console.log('deleteQnaApi response : ', response.data);
    } catch (error: any) {
      console.log('deleteQnaApi : error response', error.response.data);
    }
  },
);

export const qnaSlice = createSlice({
  name: 'qnaReducer',
  initialState,
  reducers: {
    setQnaList: (state, action: PayloadAction<any>) => {
      console.log('REDUCER' + action.payload);
      state.list = action.payload;
      return;
    },
    setQnaDetail: (state, action: PayloadAction<any>) => {
      console.log('REDUCER' + action.payload);
      state.post = action.payload;
      return;
    },
  },
});

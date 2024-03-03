import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from 'src/core/store';
import { qnaAPI } from 'src/network/api';
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
  isSuccess: false,
  onGetPostError: false, // 게시글 조회 실패 에러
  onPostQnaError: false, // 게시글 삭제 상태
};

export const getQnaListApi = createAsyncThunk(
  'qna/list',
  async (pageNo: number, thunkAPI) => {
    try {
      const response = await qnaAPI.getQnaList({ pageNo });
      console.log('getQnaListApi response : ', response.data);
      const list = response.data.data;
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
      const response = await qnaAPI.getQnaDetail(postNo);
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
    // 조회 시작 전 onError = false로 초기화
    thunkAPI.dispatch(qnaSlice.actions.resetOnError);
    try {
      // const response = await qnaAPI.postQna(postdata);
      const Token = localStorage.getItem('accessToken');
      const response = await axios.post(
        'http://localhost:8082/api/v1/qna',
        postdata,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${Token}`,
          },
        },
      );
      if (response.status !== 200) {
        throw new Error(
          `reqeust rejected : ${response.status} - ${response.data.message}`,
        );
      }
      console.log('postQnaApi response : ', response.data);
      thunkAPI.dispatch(qnaSlice.actions.setIsSuccess(true));
    } catch (error: any) {
      console.log('postQnaApi : error response', error.response);
      thunkAPI.dispatch(qnaSlice.actions.setIsSuccess(false));
      throw error;
    }
  },
);

export const modifyQnaApi = createAsyncThunk(
  'qna/detail',
  async (postdata: any, thunkAPI) => {
    try {
      const response = await qnaAPI.modifyQna(postdata);
      console.log('modifyQnaApi response : ', response.data);
    } catch (error: any) {
      console.log('deleteQnaApi : error response', error.response.data);
    }
  },
);

export const deleteQnaApi = createAsyncThunk(
  'qna/detail',
  async (postNo: string, thunkAPI) => {
    try {
      const response = await qnaAPI.deleteQna(postNo);
      console.log('deleteQnaApi response : ', response);
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
      console.log('setQnaList-REDUCER' + action.payload);
      state.list = action.payload;
      return;
    },
    setQnaDetail: (state, action: PayloadAction<any>) => {
      console.log('setOneDetail-REDUCER' + action.payload);
      state.post = action.payload;
      return;
    },
    setIsSuccess: (state, action: PayloadAction<any>) => {
      console.log('setIsSuccess-REDUCER' + action.payload);
      state.isSuccess = action.payload;
      return;
    },
    resetOnError: (state, action: PayloadAction<any>) => {
      state.onPostQnaError = false;
      state.onGetPostError = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(postQnaApi.rejected, (state, action) => {
      console.error('[postQnaApi] rejected', action.error);
      state.onPostQnaError = true;
    });
  },
});

export const postQnaError = (state: RootState) => state.qna.onPostQnaError;

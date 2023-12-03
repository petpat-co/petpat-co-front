import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { rehomingAPI } from 'src/network/api';
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
};
export const getRehomingCategoryApi = createAsyncThunk(
  'rehoming/category',
  async (postType: string, thunkAPI) => {
    try {
      const response = await rehomingAPI.getRehomingCategory(postType);
      console.log(response);
    } catch (error: any) {
      console.log('getRehoming : error response', error.response.data);
    }
  },
);
export const getRehomingListApi = createAsyncThunk(
  'rehoming/list',
  async (pageNo: number, thunkAPI) => {
    try {
      const response = await rehomingAPI.getReHomingList(pageNo);
      console.log('getRehomingListApi response : ', response.data);
      const list = response.data.data;
      thunkAPI.dispatch(rehomingSlice.actions.setRehomingList(list));
    } catch (error: any) {
      console.log('getRehoming : error response', error.response.data);
    }
  },
);

export const getOneReHomingApi = createAsyncThunk(
  'rehoming/getOneRehoming',
  async (postId: number | string, thunkAPI) => {
    try {
      const response = await rehomingAPI.getOneReHoming(postId);
      console.log(response);
    } catch (error: any) {
      console.log('getOneRehoming : error response', error.response.data);
    }
  },
);

export const postRehomingApi = createAsyncThunk(
  'rehoming/post',
  async (formdata: FormData, thunkAPI) => {
    try {
      // const response = await qnaAPI.postQna(postdata);
      const Token = localStorage.getItem('accessToken');
      const response = await axios.post(
        'http://localhost:8082/api/v1/rehoming',
        formdata,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${Token}`,
          },
        },
      );
      console.log('postQnaApi response : ', response.data);
      // thunkAPI.dispatch(rehomingSlice.actions.setIsSuccess(true));
    } catch (error: any) {
      console.log('postQnaApi : error response', error.response);
      // thunkAPI.dispatch(rehomingSlice.actions.setIsSuccess(false));
    }
  },
);

export const deleteReHomingApi = createAsyncThunk(
  'rehoming/delete',
  async (postId: number | string, thunkAPI) => {
    try {
      const response = await rehomingAPI.deleteReHoming(postId);
      console.log('deleteRehomingApi response : ', response.data);
    } catch (error: any) {
      console.log('deleteRehomingApi : error response', error.response);
    }
  },
);

export const rehomingSlice = createSlice({
  name: 'rehomingReducer',
  initialState,
  reducers: {
    setRehomingList: (state, action: PayloadAction<any>) => {
      console.log('REDUCER' + action.payload);
      state.list = action.payload;
      return;
    },
    setIsSuccess: (state, action: PayloadAction<any>) => {
      console.log('REDUCER' + action.payload);
      state.isSuccess = action.payload;
      return;
    },
  },
});

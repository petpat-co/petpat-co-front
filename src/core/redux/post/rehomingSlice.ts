import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from 'src/core/store';
import { rehomingAPI } from 'src/network/api';
import { Post } from 'src/types/post';

export const initialState: Post.RehomingState = {
  category: [],
  list: [],
  post: {
    bookmarkCnt: 0,
    bookmarked: false,
    category: '고양이',
    cityCountryName: '원미구',
    cityName: '경기도 부천시',
    createdAt: '2023-12-17T14:38:08.067204',
    description: 'ㅁㄴㅇㅁㄴㅇ',
    detailAdName: '유나네집',
    fullAdName: '106동 1003호',
    gender: 'BOY',
    likeCnt: 0,
    liked: false,
    nickname: '유나',
    petAge: '2023-12-01',
    petName: 'ㄷㄹㄷㄹ',
    postType: '분양',
    rehomingId: 1,
    rehomingImg: [
      'https://ryungbucket.s3.ap-northeast-2.amazonaws.com/7cc2e304-7261-4274-b232-f099a65ba716.png',
    ],
    status: 'REHOMING_FINDING',
    title: 'ㅂㅂㅂ',
    townShipName: '역곡동',
    type: '러시안 블루',
    updatedAt: '2023-12-17T14:45:27.4884334',
    userId: 1,
    viewCnt: 14,
  },
  onError: false,
};
export const getRehomingCategoryApi = createAsyncThunk(
  'rehoming/category',
  async (postType: string, thunkAPI) => {
    try {
      const response = await rehomingAPI.getRehomingCategory(postType);
      console.log(response);
      thunkAPI.dispatch(
        rehomingSlice.actions.setCategories(response.data.data),
      );
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
      thunkAPI.dispatch(
        rehomingSlice.actions.setRehomingPost(response.data.data),
      );
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
      if (response.data.result === 'SUCCESS') {
        window.location.replace('/rehome');
      }
      // thunkAPI.dispatch(rehomingSlice.actions.setIsSuccess(true));
    } catch (error: any) {
      console.log('postQnaApi : error response', error.response);
      // thunkAPI.dispatch(rehomingSlice.actions.setIsSuccess(false));
    }
  },
);

export const modifyRehomingApi = createAsyncThunk(
  'rehoming/modify',
  async (data: any | string, thunkAPI) => {
    try {
      const Token = localStorage.getItem('accessToken');
      console.log(data.postId);
      const response = await axios.put(
        `http://localhost:8082/api/v1/rehoming?postId=${data.postId}`,
        data.formdata,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${Token}`,
          },
        },
      );
      console.log(response);
    } catch (error: any) {
      console.log('modifyRehomingApi : error response', error.response);
    }
  },
);

export const deleteReHomingApi = createAsyncThunk(
  'rehoming/delete',
  async (postId: number | string, thunkAPI) => {
    try {
      const response = await rehomingAPI.deleteReHoming(postId);
      console.log('deleteRehomingApi response : ', response.data);
      if (response.data.result === 'SUCCESS') {
        window.alert('삭제완료');
        window.location.replace('/rehome');
      } else {
        window.alert('삭제 실패');
      }
    } catch (error: any) {
      console.log('deleteRehomingApi : error response', error.response);
      throw error;
    }
  },
);

export const bookmarkApi = createAsyncThunk(
  'rehoming/bookmark',
  async (postId: number | string, thunkAPI) => {
    try {
      const response = await rehomingAPI.bookMark(postId);
      console.log('bookmarkApi response : ', response.data);
    } catch (error: any) {
      console.log('deleteRehomingApi : error response', error.response);
    }
  },
);

export const rehomingSlice = createSlice({
  name: 'rehomingReducer',
  initialState,
  reducers: {
    setCategories: (state, action: PayloadAction<any>) => {
      // console.log("REDUCER "+action.payload);
      state.category = action.payload;
      return;
    },
    setRehomingList: (state, action: PayloadAction<any>) => {
      console.log('REDUCER' + action.payload);
      state.list = action.payload;
      return;
    },
    setRehomingPost: (state, action: PayloadAction<any>) => {
      console.log('REDUCER' + action.payload);
      state.post = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(deleteReHomingApi.rejected, (state, action) => {
      console.error('[deleteReHomingApi] rejected', action.error);
      state.onError = true;
    });
  },
});

export const selectOnError = (state: RootState) => state.rehoming.onError;
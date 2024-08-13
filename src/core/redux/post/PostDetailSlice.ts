// ** Import React
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

// ** Import api
import { postAPI } from '../../../network/api';

// ** Import utils
import { postSlice } from './postSlice';
import { Post2 } from '../../../types/post2';

export const initialState: Post2.PostDetailState = {
  post: {
    postId: 0,
    postType: '',
    title: '',
    description: '',
    imageList: [],
    viewCnt: 0,
    isBookmarked: false,
    createdAt: '',
    updatedAt: '',
    userId: 0,
    nickname: '',
    profileImg: '',
  },
  onGetPostError: false,
  onAddPostError: false,
  onDeleteError: false,
  onError: false,
  errorMessage: '',
};

// 글 상세 조회
export const getOnePostApi = createAsyncThunk(
  'post/detail',
  async (data: any | string, thunkAPI) => {
    // data : postType(trade, rehoming, qna), postId
    // 조회 시작 전 onError = false로 초기화
    thunkAPI.dispatch(postSlice.actions.resetOnError);
    try {
      const response = await postAPI.getOnePost(data);
      if (response.status !== 200) {
        throw new Error(
          `reqeust rejected : ${response.status} - ${response.data.message}`,
        );
      }
      console.log('getOnePostApi response : ', response.data);
      // detail set
      const postData = {
        post: response.data.data,
        postType: data.postType,
      };
      thunkAPI.dispatch(postDetailSlice.actions.setPost(postData));
      return postData;
    } catch (error: any) {
      console.log('getOnePostApi error response : ', error.response);
      throw error;
    }
  },
);

// 글 등록
export const addPostApi = createAsyncThunk(
  'post/add',
  async (data: any | string, thunkAPI) => {
    // postType(trade, rehoming, qna), data : formData
    // 등록 시작 전 onError = false로 초기화
    thunkAPI.dispatch(postDetailSlice.actions.resetOnError);
    try {
      const response = await postAPI.addPost(data);
      console.log('addPostApi response : ', response.data);

      if (response.status !== 200) {
        throw new Error(
          `reqeust rejected : ${response.status} - ${response.data.message}`,
        );
      }
    } catch (error: any) {
      console.error('addPostApi error response : ', error.response);
      throw error;
    }
  },
);

// 글 수정
export const modifyPostApi = createAsyncThunk(
  'post/modify',
  async (data: any | string, thunkAPI) => {
    // data : postId, postType(trade, rehoming, qna), formdata
    // 수정 시작 전 onError = false로 초기화
    thunkAPI.dispatch(postSlice.actions.resetOnError);
    try {
      const response = await postAPI.updatePost(data);
      console.log('modifyPostApi response : ', response.data);
    } catch (error: any) {
      console.log('modifyPostApi error response : ', error.response);
    }
  },
);

// 글 삭제
export const deletePostApi = createAsyncThunk(
  'post/delete',
  async (data: any | string, thunkAPI) => {
    // data : postId, postType(trade/rehoming/qna)
    // 삭제 시작 전 onError = false로 초기화
    thunkAPI.dispatch(postDetailSlice.actions.resetOnError);
    // 삭제 시작
    try {
      const response = await postAPI.deletePost(data);
      console.log('deletePostApi response : ', response.data);
    } catch (error: any) {
      console.log('deletePostApi : error response', error.response);
      throw error;
    }
  },
);

// 글 좋아요 등록
export const likeApi = createAsyncThunk(
  'post/like',
  async (data: any | string, thunkAPI) => {
    try {
      const changePostType = data.postType.toUpperCase();
      const response = await postAPI.likePost({
        postType: changePostType,
        postId: data.postId,
      });
      console.log('likeApi response : ', response.data);
    } catch (error: any) {
      console.log('likeApi : error response', error.response);
    }
  },
);

// 글 북마크 등록
export const bookmarkApi = createAsyncThunk(
  'post/bookmark',
  async (data: any | string, thunkAPI) => {
    try {
      const response = await postAPI.bookmarkPost(data);
      console.log('bookmarkApi response : ', response.data);
    } catch (error: any) {
      console.log('bookmarkApi : error response', error.response);
    }
  },
);

export const postDetailSlice = createSlice({
  name: 'postDetailReducer',
  initialState,
  reducers: {
    setPost: (state, action: PayloadAction<any>) => {
      console.log('SetPost' + action.payload);
      const postType = action.payload.postType;
      const post = action.payload.post;

      if (!postType) {
        console.error('알 수 없는 타입의 게시글입니다 : ', postType);
        state.errorMessage = 'UNKOWN_POSTTYPE';
      } else {
        state.post = post;
      }
    },

    resetOnError: (state, action: PayloadAction<any>) => {
      state.onGetPostError = false;
      state.onAddPostError = true;
      state.onDeleteError = false;
    },
  },
});

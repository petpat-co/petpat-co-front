// ** Import React
import { createAsyncThunk } from '@reduxjs/toolkit';

// ** Import api
import { postAPI } from '../../../network/api';

export const postLikedListApi = createAsyncThunk(
  '/likes',
  async (postInfo: { postType: string; id: number }, thunkAPI) => {
    try {
      const response = await postAPI.postLikedStatus(postInfo);
      console.log('postLikedListApi response : ', response.data);
    } catch (error: any) {
      console.log('postLikedListApi : error response', error.response.data);
    }
  },
);

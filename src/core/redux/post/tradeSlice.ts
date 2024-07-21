// ** Import React
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

// ** Import lib
import axios from 'axios';

export const postTradeApi = createAsyncThunk(
  'trade/write',
  async (postData: FormData, thunkAPI) => {
    try {
      const Token = localStorage.getItem('accessToken');
      const response = await axios.post(
        'http://localhost:8082/api/v1/trade',
        postData,
        {
          headers: {
            Authorization: `Bearer ${Token}`,
            'Content-Type': 'multipart/form-data',
          },
        },
      );
      // TODO: 아래의 함수가 동작하지 않는 이유
      // const response = await tradeAPI.postTrade(postData);

      console.log('postTradeApi response : ', response.data);
      return response.data.result === 'SUCCESS';
    } catch (error: any) {
      console.log('postTradeApi : error response', error.response.data);
    }
  },
);

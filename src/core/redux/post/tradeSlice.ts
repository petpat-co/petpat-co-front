// ** Import React
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

// ** Import api
import { tradeAPI } from 'src/network/api';

// ** Import types
import { Post } from '../../../types/post';

// ** Import lib
import axios from 'axios';

export const initialState: Post.TradeState = {
  list: [
    {
      id: 0,
      title: '',
      price: 0,
      imagePath: '',
      region: '',
      status: 0,
      liked: false,
      viewCnt: 0,
      postType: '',
    },
  ],
  isSuccess: false,
};

export const getTradeListApi = createAsyncThunk(
  'trade/list',
  async (pageNo: number, thunkAPI) => {
    try {
      const response = await tradeAPI.getTradeList({ pageNo });
      console.log('getTradeListApi response : ', response.data);
      let list = response.data.data.content;
      // 데이터 가공
      list = list.map((data: any) => {
        // key 변경
        data.id = data.tradeId;
        delete data.tradeId;

        // value 변경
        if (data.status === 'TRADE_RESERVING') {
          data.status = 1;
        } else if (data.status === 'TRADE_COMPLETED') {
          data.status = 2;
        } else {
          data.status = 0;
        }

        // key-value 추가
        data.postType = 'TRADE';

        return data;
      });
      thunkAPI.dispatch(tradeSlice.actions.setTradeList(list));
    } catch (error: any) {
      console.log('getTradeListApi : error response', error.response.data);
    }
  },
);

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
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${Token}`,
          },
        },
      );
      // TODO: 아래의 함수가 동작하지 않는 이유
      // const response = await tradeAPI.postTrade(postData);
      console.log('postTradeApi response : ', response.data);
      thunkAPI.dispatch(tradeSlice.actions.setIsSuccess(true));
      return true;
    } catch (error: any) {
      console.log('postTradeApi : error response', error.response.data);
      thunkAPI.dispatch(tradeSlice.actions.setIsSuccess(false));
      return false;
    }
  },
);

export const tradeSlice = createSlice({
  name: 'tradeReducer',
  initialState,
  reducers: {
    setTradeList: (state, action: PayloadAction<any>) => {
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

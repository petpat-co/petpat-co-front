// ** Import React
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

// ** Import api
import { tradeAPI } from 'src/network/api';

// ** Import types
import { Post } from '../../../types/post';

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

export const postLikedListApi = createAsyncThunk(
  '/likes',
  async (postInfo: { postType: string; id: number }, thunkAPI) => {
    try {
      const response = await tradeAPI.postLikedStatus(postInfo);
      console.log('postLikedListApi response : ', response.data);
    } catch (error: any) {
      console.log('postLikedListApi : error response', error.response.data);
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
  },
});

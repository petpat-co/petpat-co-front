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
      status: '',
      liked: false,
      viewCnt: 0,
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
      // 프로퍼티 value 값 변경 처리
      list = list.map((data: any) => {
        data.id = data.tradeId;
        delete data.tradeId;
        return data;
      });
      thunkAPI.dispatch(tradeSlice.actions.setTradeList(list));
    } catch (error: any) {
      console.log('getTradeListApi : error response', error.response.data);
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

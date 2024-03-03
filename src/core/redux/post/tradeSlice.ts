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
      postId: 0,
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
  categoryList: [
    {
      categoryId: 0,
      categoryName: '',
      detailCategoryList: [
        {
          tradeCategoryId: 0,
          tradeCategoryName: '',
          tradeCategoryDetailList: [
            {
              tradeCategoryDetailId: 0,
              tradeCategoryDetailName: '',
              tradeCategoryDetailCnt: 0,
            },
          ],
        },
      ],
    },
  ],
  initCategory: {
    parentInfo: { id: 0, value: '' },
    childInfo: { id: 0, value: '' },
    lastInfo: { id: 0, value: '' },
  },
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
            Authorization: `Bearer ${Token}`,
            'Content-Type': 'multipart/form-data',
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

// TODO: 카테고리 조회 API 변경 예정
export const getCategoryListApi = createAsyncThunk(
  'trade/categoryList',
  async (initData: any[], thunkAPI) => {
    try {
      Promise.all(
        initData.map(async (category: any) => {
          let detailCategoryList = (
            await tradeAPI.tradeCategoryList({
              categoryId: category.categoryId,
            })
          ).data.data;

          return {
            id: category.id,
            categoryName: category.categoryName,
            categoryId: category.categoryId,
            detailCategoryList: detailCategoryList,
          };
        }),
      ).then((getCategoryList) => {
        console.log('update list ==> ', getCategoryList);
        // 초기 데이터 저장
        thunkAPI.dispatch(
          tradeSlice.actions.setInitCategory(getCategoryList[0]),
        );
        // 카테고리 목록 저장
        thunkAPI.dispatch(tradeSlice.actions.setCategoryList(getCategoryList));
      });
    } catch (error: any) {
      console.log('getCategoryListApi : error response', error.response.data);
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

    setInitCategory: (state, action: PayloadAction<any>) => {
      const lastInfo = {
        id: action.payload.detailCategoryList[0].tradeCategoryDetailList[0]
          .tradeCategoryDetailId,
        value:
          action.payload.detailCategoryList[0].tradeCategoryDetailList[0]
            .tradeCategoryDetailName,
      };

      const childInfo = {
        id: action.payload.detailCategoryList[0].tradeCategoryId,
        value: action.payload.detailCategoryList[0].tradeCategoryName,
      };

      const parentInfo = {
        id: action.payload.categoryId,
        value: action.payload.categoryName,
      };

      state.initCategory = {
        lastInfo,
        childInfo,
        parentInfo,
      };

      console.log('state init categroy ==> ', state.initCategory);
      return;
    },

    setCategoryList: (state, action: PayloadAction<any>) => {
      state.categoryList = action.payload;
      return;
    },
  },
});

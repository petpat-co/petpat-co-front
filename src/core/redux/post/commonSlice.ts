// ** Import React
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

// ** Import api
import { postAPI } from '../../../network/api';
import { Post } from '../../../types/post';
import { Category } from '../../../types/category';

// TODO: 추후 postSlice 파일로 이관 후 해당 파일은 삭제 예정
export const initialState: Post.ListState = {
  category: [],
  list: [],
  banner: [],
  post: {
    postId: 0,
    title: '',
    viewCnt: 0,
    postType: '',
    region: '',
    imagePath: '',
    liked: false,
    status: '',
    price: 0,
  },
  pageInfo: {
    totalPage: 0,
    pageNo: 0,
  },
  onError: false,
};

export const getCategoryListApi = createAsyncThunk(
  '/categoryList',
  async (postType: string, thunkAPI) => {
    try {
      const response = await postAPI.getCategoryList({ postType });
      const categories = response.data.data;

      if (postType === 'rehoming') {
        /** @초성추출 */
        const initialChars = [
          'ㄱ',
          'ㄱ',
          'ㄴ',
          'ㄷ',
          'ㄷ',
          'ㄹ',
          'ㅁ',
          'ㅂ',
          'ㅂ',
          'ㅅ',
          'ㅅ',
          'ㅇ',
          'ㅈ',
          'ㅈ',
          'ㅊ',
          'ㅋ',
          'ㅌ',
          'ㅍ',
          'ㅎ',
        ];
        const getInitial = (categoryName: string) => {
          // 겹자음 기본 자음에 포함
          // 첫 글자의 UNICODE를 통해 첫 초성 추정
          // 한글 UNICODE 범위 :  44032 ~ 55203
          // 44032 : '가' / 55203 : '힣'
          const charCode = categoryName.charCodeAt(0) - 44032;
          if (charCode < 0 || charCode > 11171) {
            // 44032 ~ 55203 내의 문자가 아닌 경우
            return null;
          }
          // 한 초성의 이 가질 수 있는 조합의 경우의 수 : 588
          //  => 588로 나누었을 때의 몫 = 초성의 index
          return initialChars[Math.floor(charCode / 588)];
        };

        const sortCategory = (firstCategory: Category.FirstCategory[]) => {
          return firstCategory.map((category: any) => {
            // 자음별 분류 [key: 초성]
            const grouped: { [key: string]: Category.SecondCategory } = {};

            // 데이터가 없는 경우에도 빈 카테고리 생성
            initialChars.forEach((initial, index) => {
              grouped[initial] = {
                secondCategoryName: initial,
                secondCategoryId: index + 1,
                thirdCategoryList: [],
              };
            });

            // 초성별 분류 시작
            category.secondCategoryList.map((secondCategory: any) => {
              let initial = getInitial(secondCategory.secondCategoryName);
              if (!initial) {
                initial = 'etc';
              }

              if (!grouped[initial]) {
                grouped[initial] = {
                  secondCategoryName: initial,
                  secondCategoryId: Object.keys(grouped).length + 1,
                  thirdCategoryList: [],
                };
              }
              grouped[initial].thirdCategoryList.push({
                thirdCategoryId: secondCategory.secondCategoryId,
                thirdCategoryName: secondCategory.secondCategoryName,
                thirdCategoryCnt: secondCategory.secondCategoryCnt,
              });
            });

            return {
              firstCategoryId: category.firstCategoryId,
              firstCategoryName: category.firstCategoryName,
              secondCategoryList: Object.values(grouped),
            };
          });
        };

        thunkAPI.dispatch(
          commonSlice.actions.setCategoryList(sortCategory(categories)),
        );
        console.log(
          'getCategoryListApi response ===> ',
          sortCategory(categories),
        );
      } else {
        thunkAPI.dispatch(commonSlice.actions.setCategoryList(categories));
        console.log('getCategoryListApi response ===> ', categories);
      }
    } catch (error: any) {
      console.log('getCategoryListApi : error response', error.response.data);
    }
  },
);

export const getPostListApi = createAsyncThunk(
  '/postList',
  async (info: any, thunkAPI) => {
    try {
      const response = await postAPI.getPostList({
        pageNo: info.pageNo,
        postType: info.postType,
      });
      console.log('getPostListApi response : ', response.data.data);
      thunkAPI.dispatch(commonSlice.actions.setPostList(response.data.data));
      // thunkAPI.dispatch(tradeSlice.actions.setTradeList(response.data.data));
    } catch (error: any) {
      console.log('getPostListApi : error response', error.response.data);
    }
  },
);

export const getBannerListApi = createAsyncThunk(
  '/bannerList',
  async (postType: string, thunkAPI) => {
    try {
      const response = await postAPI.getBannerList({ postType });
      console.log('getBannerListApi response : ', response.data.data);
      thunkAPI.dispatch(commonSlice.actions.setBannerList(response.data.data));
    } catch (error: any) {
      console.log('getBannerListApi : error response', error.response.data);
    }
  },
);

export const commonSlice = createSlice({
  name: 'commonReducer',
  initialState,
  reducers: {
    setPostList: (state, action: PayloadAction<any>) => {
      console.log('REDUCER' + action.payload);
      state.list = action.payload.content;
      state.pageInfo.totalPage = action.payload.totalPage;
      state.pageInfo.pageNo = action.payload.pageNo;
    },

    setCategoryList: (state, action: PayloadAction<any>) => {
      state.category = action.payload;
    },

    setBannerList: (state, action: PayloadAction<any>) => {
      console.log('REDUCER' + action.payload);
      state.banner = action.payload;
    },
  },
});

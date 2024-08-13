// ** Import React
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

// ** Import api
import { postAPI } from '../../../network/api';

// ** Import utils
import { Post2 } from '../../../types/post2';
import { Category } from '../../../types/category';

export const initialState: Post2.PostListState = {
  list: [],
  category: [],
  banner: [],
  pageInfo: {
    totalPage: 0,
    pageNo: 0,
  },
};

// 글 목록 조회
export const getPostListApi = createAsyncThunk(
  'post/list',
  async (data: any, thunkAPI) => {
    try {
      const response = await postAPI.getPostList({
        pageNo: data.pageNo,
        postType: data.postType,
      });
      console.log('getPostListApi response : ', response.data.data);
      thunkAPI.dispatch(postListSlice.actions.setPostList(response.data.data));
    } catch (error: any) {
      console.log('getPostListApi : error response', error.response.data);
    }
  },
);

// 인기있는 글 목록 조회
export const getBannerListApi = createAsyncThunk(
  'post/bannerList',
  async (postType: string, thunkAPI) => {
    try {
      const response = await postAPI.getBannerList({ postType });
      console.log('getBannerListApi response : ', response.data.data);
      thunkAPI.dispatch(
        postListSlice.actions.setBannerList(response.data.data),
      );
    } catch (error: any) {
      console.log('getBannerListApi : error response', error.response.data);
    }
  },
);

// 카테고리 목록 조회
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
          postListSlice.actions.setCategoryList(sortCategory(categories)),
        );
        console.log(
          'getCategoryListApi response ===> ',
          sortCategory(categories),
        );
      } else {
        thunkAPI.dispatch(postListSlice.actions.setCategoryList(categories));
        console.log('getCategoryListApi response ===> ', categories);
      }
    } catch (error: any) {
      console.log('getCategoryListApi : error response', error.response.data);
    }
  },
);

export const postListSlice = createSlice({
  name: 'postListReducer',
  initialState,
  reducers: {
    setPostList: (state, action: PayloadAction<any>) => {
      console.log('SetPostList' + action.payload);
      state.list = action.payload.content;
      state.pageInfo.totalPage = action.payload.totalPage;
      state.pageInfo.pageNo = action.payload.pageNo;
    },

    setBannerList: (state, action: PayloadAction<any>) => {
      console.log('SetBannerList' + action.payload);
      state.banner = action.payload;
    },

    setCategoryList: (state, action: PayloadAction<any>) => {
      console.log('SetCategoryList' + action.payload);
      state.category = action.payload;
    },
  },
});

import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from 'src/core/store';
import { postAPI, rehomingAPI } from 'src/network/api';
import { Post } from 'src/types/post';
import { Category } from 'src/types/category';

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
    imageList: [
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
      const categories = response.data.data;

      /** @초성추출 */
      const initialChars = ['ㄱ', 'ㄱ', 'ㄴ', 'ㄷ', 'ㄷ', 'ㄹ', 'ㅁ', 'ㅂ', 'ㅂ', 'ㅅ', 'ㅅ', 'ㅇ', 'ㅈ', 'ㅈ', 'ㅊ', 'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ'];
      const getInitial = (categoryName: string) => {
        // 겹자음 기본 자음에 포함
        // 첫 글자의 UNICODE를 통해 첫 초성 추정
        // 한글 UNICODE 범위 :  44032 ~ 55203
        // 44032 : '가' / 55203 : '힣' 
        const charCode  = categoryName.charCodeAt(0) - 44032;
        if(charCode  < 0 || charCode  > 11171 ) {
          // 44032 ~ 55203 내의 문자가 아닌 경우
          return null;
        }
        // 한 초성의 이 가질 수 있는 조합의 경우의 수 : 588
        //  => 588로 나누었을 때의 몫 = 초성의 index 
        return initialChars[Math.floor(charCode/588)];
      }

      const sortCategory = (firstCategory: Category.FirstCategory[]) => {
        return firstCategory.map((category: any) => {
          // 자음별 분류 [key: 초성]
          const grouped: {[key:string]: Category.SecondCategory} = {};

          // 데이터가 없는 경우에도 빈 카테고리 생성
          initialChars.forEach((initial, index) => {
            grouped[initial] = {
              secondCategoryName: initial,
              secondCategoryId: index + 1,
              thirdCategoryList: []
            };
          });

          // 초성별 분류 시작
          category.secondCategoryList.map((secondCategory: any) => {
            let initial = getInitial(secondCategory.secondCategoryName);
            if(!initial) {
              initial = 'etc';
            }

            if(!grouped[initial]) {
              grouped[initial] = {
                secondCategoryName: initial,
                secondCategoryId: Object.keys(grouped).length + 1,
                thirdCategoryList: []
              }
            }
            grouped[initial].thirdCategoryList.push({
              thirdCategoryId: secondCategory.secondCategoryId,
              thirdCategoryName: secondCategory.secondCategoryName
            })
          })

          return {
            firstCategoryId: category.firstCategoryId,
            firstCategoryName: category.firstCategoryName,
            secondCategoryList: Object.values(grouped),
          }
        })
      }

      thunkAPI.dispatch(
        rehomingSlice.actions.setCategories(sortCategory(categories)),
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
      const list = response.data.data.content;
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
      console.log(response.data.data);
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
        window.location.replace('/rehoming');
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
        data.formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${Token}`,
          },
        },
      );
      if (response.data.result === 'SUCCESS') {
        window.location.replace('/rehoming/detail/' + data.postId);
      }
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
      if (response.data.result === 'SUCCESS') {
        window.alert('삭제완료');
        window.location.replace('/rehoming');
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
      console.log('bookmarkApi : error response', error.response);
    }
  },
);

export const likeApi = createAsyncThunk(
  'rehoming/like',
  async (postId: number | string, thunkAPI) => {
    try {
      const response = await rehomingAPI.like(postId);
      console.log('likeApi response : ', response.data);
    } catch (error: any) {
      console.log('likeApi : error response', error.response);
    }
  },
);




export const rehomingSlice = createSlice({
  name: 'rehomingReducer',
  initialState,
  reducers: {
    setCategories: (state, action: PayloadAction<any>) => {
      state.category = action.payload;
      return;
    },
    setRehomingList: (state, action: PayloadAction<any>) => {
      state.list = action.payload;
      return;
    },
    setRehomingPost: (state, action: PayloadAction<any>) => {
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

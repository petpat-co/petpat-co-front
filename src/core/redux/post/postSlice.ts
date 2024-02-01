import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'src/core/store';
import { postAPI } from 'src/network/api';
import { Post } from 'src/types/post';

export const initialState: Post.PostState = {
  qna: {
    qnaImage: [],
    postId: '',
    postType: '',
    title: '',
    username: '',
    description: '',
    createdAt: '',
    updatedAt: '',
    isBookmark: false,
    isCompleted: false,
    viewCount: '',
    bookMark: '',
  },
  trade: {
    // user
    userId: 0, // 작성자 번호
    image:
      'https://image.newsis.com/2023/11/22/NISI20231122_0001418773_web.jpg', // 작성자 이미지(변수명 변경 필요)
    nickname: '카리나', // 작성자 닉네임

    // post info
    postType: '분양', // 글 타입 (서버에서 내려온 postType - 분양, 거래...)
    tradeId: 1, // 글 번호(거래)
    postId: 1, // 글 번호(예비용)

    // post content
    title: 'title', // 글 제목
    description: 'description', // 상세설명(분양)
    content: 'content', // 상세설명(거래)
    createdAt: '0000-00-00', // 글 작성일

    // post status
    status: 'TRADE_FINDING', // 분양/판매 상태 (ex_TRADE_FINDING...)
    liked: false, // 좋아요 상태
    likeCnt: 0, // 좋아요 수
    bookmarked: false, // 북마크 상태
    bookmarkCnt: 0, // 북마크 수
    viewCnt: 0, // 조회수

    // image - 추후 사용되지 않는 변수 삭제 필요
    tradeImg: [
      'https://cdn-icons-png.flaticon.com/512/235/235405.png',
      'https://cdn-icons-png.flaticon.com/512/2528/2528787.png',
      'https://cdn-icons-png.flaticon.com/256/4823/4823463.png',
    ],
    images: [
      'https://cdn-icons-png.flaticon.com/512/235/235405.png',
      'https://cdn-icons-png.flaticon.com/512/2528/2528787.png',
      'https://cdn-icons-png.flaticon.com/256/4823/4823463.png',
    ],
    imageList: [
      'https://cdn-icons-png.flaticon.com/512/235/235405.png',
      'https://cdn-icons-png.flaticon.com/512/2528/2528787.png',
      'https://cdn-icons-png.flaticon.com/256/4823/4823463.png',
    ],

    // address
    cityName: '--도 --시', // 도,시
    townShipName: '--동', // 동
    cityCountryName: '--구', // 구
    detailAdName: '--아파트', // 상세주소
    region: '--도 --시 --동 --구 --아파트 --동 ---호', // 주소 한번에 내려주는 방식으로 변경 예정

    // trade
    price: 0, // 가격
    tradeCategoryDetailName: '건식 사료', // 거래 물품 이름
  },
  rehome: {
    // user
    userId: 0, // 작성자 번호
    image:
      'https://image.newsis.com/2023/11/22/NISI20231122_0001418773_web.jpg', // 작성자 이미지(변수명 변경 필요)
    nickname: '카리나', // 작성자 닉네임

    // post info
    postType: '분양', // 글 타입 (서버에서 내려온 postType - 분양, 거래...)
    rehomingId: 1, // 글 번호(분양)
    postId: 1, // 글 번호(예비용)

    // post content
    title: 'title', // 글 제목
    description: 'description', // 상세설명(분양)
    content: 'content', // 상세설명(거래)
    createdAt: '0000-00-00', // 글 작성일

    // post status
    status: 'TRADE_FINDING', // 분양/판매 상태 (ex_TRADE_FINDING...)
    liked: false, // 좋아요 상태
    likeCnt: 0, // 좋아요 수
    bookmarked: false, // 북마크 상태
    bookmarkCnt: 0, // 북마크 수
    viewCnt: 0, // 조회수

    // image - 추후 사용되지 않는 변수 삭제 필요
    rehomingImg: [
      'https://cdn-icons-png.flaticon.com/512/235/235405.png',
      'https://cdn-icons-png.flaticon.com/512/2528/2528787.png',
      'https://cdn-icons-png.flaticon.com/256/4823/4823463.png',
    ],

    // address
    cityName: '--도 --시', // 도,시
    townShipName: '--동', // 동
    cityCountryName: '--구', // 구
    detailAdName: '--아파트', // 상세주소
    region: '--도 --시 --동 --구 --아파트 --동 ---호', // 주소 한번에 내려주는 방식으로 변경 예정

    // rehoming
    category: '강아지', // 동물 타입 (ex_ 강아지, 고양이...)
    type: '포메라니안', // 동물 하위타입 (ex_ 시츄, 포메라니안...)
    petName: '돌돌이', // 지어준 동물 이름
    petAge: '0000-00-00', // 동물 생년월일 (ex_2024-01-01)
    gender: 'GIRL', // 동물 성별
  },
  onGetPostError: false, // 게시글 조회 실패 에러
  onDeleteError: false, // 게시글 삭제 상태
  error: '',
};

export const getOnePostApi = createAsyncThunk(
  'post/getPost',
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
      thunkAPI.dispatch(postSlice.actions.setPost(postData));
    } catch (error: any) {
      console.log('getOnePostApi error response : ', error.response);
      throw error;
    }
  },
);

export const modifyPostApi = createAsyncThunk(
  'post/modify',
  async (data: any | string, thunkAPI) => {
    // data : postId, postType(trade, rehoming, qna), formdata
    try {
      const response = await postAPI.updatePost(data);
      console.log('modifyPostApi response : ', response.data);
    } catch (error: any) {
      console.log('modifyPostApi error response : ', error.response);
    }
  },
);

export const deletePostApi = createAsyncThunk(
  'post/delete',
  async (data: any | string, thunkAPI) => {
    // data : postId, postType(trade/rehoming/qna)
    // 삭제 시작 전 onError = false로 초기화
    thunkAPI.dispatch(postSlice.actions.resetOnError);
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

// 추후에 common으로 옮기겠습니다 >.< !!
export const bookmarkApi = createAsyncThunk(
  'rehoming/bookmark',
  async (data: any | string, thunkAPI) => {
    try {
      const response = await postAPI.bookmarkPost(data);
      console.log('bookmarkApi response : ', response.data);
    } catch (error: any) {
      console.log('bookmarkApi : error response', error.response);
    }
  },
);

export const likeApi = createAsyncThunk(
  'rehoming/like',
  async (data: any | string, thunkAPI) => {
    try {
      const response = await postAPI.likePost(data);
      console.log('likeApi response : ', response.data);
    } catch (error: any) {
      console.log('likeApi : error response', error.response);
    }
  },
);

export const postSlice = createSlice({
  name: 'postReducer',
  initialState,
  reducers: {
    setPost: (state, action: PayloadAction<any>) => {
      const postType = action.payload.postType;
      const post = action.payload.post;
      switch (postType) {
        case 'rehoming':
          state.rehome = post;
          break;
        case 'trade':
          state.trade = post;
          break;
        case 'qna':
          state.qna = post;
          break;
        default:
          console.error('알 수 없는 타입의 게시글입니다 : ', postType);
          state.error = 'UNKOWN_POSTTYPE';
      }
    },
    resetOnError: (state, action: PayloadAction<any>) => {
      state.onDeleteError = false;
      state.onGetPostError = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(deletePostApi.rejected, (state, action) => {
      console.error('[deletePostApi] rejected', action.error);
      state.onGetPostError = true;
    });
    builder.addCase(getOnePostApi.rejected, (state, action) => {
      console.error('[getOnePostApi] rejected', action.error);
      state.onDeleteError = true;
    });
  },
});

export const selectOnGetPostError = (state: RootState) =>
  state.post.onGetPostError;
export const selectOnDeleteError = (state: RootState) =>
  state.post.onDeleteError;

import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { mypageAPI } from 'src/network/api';
import { User } from 'src/types/user';

export const initialState: User.UserType = {
  user: {
    userEmail: '',
    userNickname: '',
    userImg:
      'https://pbs.twimg.com/profile_images/1116573617645424640/u5h2q3jv_400x400.png',
  },
  emailCheck: false,
  is_login: false,
  mypage: {
    myPostList: {
      rehoming: [],
      trade: [],
      Qna: [],
    },
    myLikeList: [],
    myComment: [],
    myBookmark: [],
  },
};

export const modifyProfileApi = createAsyncThunk(
  'mypage/profile',
  async (formdata: FormData, thunkAPI) => {
    try {
      console.log(formdata.get('profileImgFile'));
      // const response = await mypageAPI.modifyProfile(formdata);
      const Token = localStorage.getItem('token');
      const response = await axios.put(
        'http://121.141.140.90:8082/api/v1/profile',
        formdata,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${Token}`,
          },
        },
      );
      const data = {
        userNickname: formdata.get('username'),
        userImg: formdata.get('profileImgUrl'),
      };
      console.log(response.data);
      thunkAPI.dispatch(myPage.actions.setUser(data));
      // if (response.status === 80200) {
      //   console.log('성공');
      //   // window.location.replace('/mypage');
      // } else if (response.status === 80400) {
      //   window.alert('정보 변경 실패');
      //   window.location.replace('/mypage');
      //   return;
      // }
    } catch (error: any) {
      console.log('modifyProfileApi : error response', error.response.data);
    }
  },
);

// 비밀번호 확인
export const checkPwApi = createAsyncThunk(
  'mypage/checkpw',
  async (data: any, thunkAPI) => {
    try {
      const response = await mypageAPI.checkPW(data);
      if (response.status === 80200) {
        console.log('성공');
        return;
      } else if (response.status === 80400) {
        window.alert('정보 변경 실패');
        console.log(response);
        return;
      }
    } catch (error: any) {
      console.log('checkPwApi : error response', error.response.data);
    }
  },
);

export const changePwApi = createAsyncThunk(
  'mypage/changepw',
  async (data: any, thunkAPI) => {
    try {
      console.log(data);
      const response = await mypageAPI.changePW({ data });
      if (response.status === 80200) {
        console.log('성공');
        return;
      } else if (response.status === 80400) {
        window.alert('정보 변경 실패');
        console.log(response);
        return;
      }
    } catch (error: any) {
      console.log('changePwApi : error response', error.response.data);
    }
  },
);

export const getRehomingListApi = createAsyncThunk(
  'mypage/rehominglist',
  async (data: '', thunkAPI) => {
    try {
      const response = await mypageAPI.getRehomingList();
      // if (response.status === 80200) {
      console.log('Rehoming 성공' + response.data.content);
      // console.log('Rehoming 성공' + response.data.data.content);
      const list = response.data.content;
      // const list = response.data.data.content;
      thunkAPI.dispatch(myPage.actions.getRehomingList(list));
      // return;
      // } else if (response.status === 80400) {
      // window.alert('정보 조회 실패');
      // console.log(response);
      // return;
      // }
    } catch (error: any) {
      console.log('getRehomingListApi : error response', error.response.data);
    }
  },
);

export const getTradeListApi = createAsyncThunk(
  'mypage/tradelist',
  async (data, thunkAPI) => {
    try {
      const response = await mypageAPI.getTradeList(data);
      // if (response.status === 80200) {
      console.log('TradeList 성공' + JSON.stringify(response.data.content));
      const list = response.data.content;
      // const list = response.data.data.content;
      thunkAPI.dispatch(myPage.actions.getTradeList(list));
      //   return;
      // } else if (response.status === 80400) {
      //   window.alert('정보 조회 실패');
      //   console.log(response);
      //   return;
      // }
    } catch (error: any) {
      console.log('getTradeListApi : error response', error.response.data);
    }
  },
);

export const getQnaListApi = createAsyncThunk(
  'mypage/qnalist',
  async (data, thunkAPI) => {
    try {
      const response = await mypageAPI.getQnaList(data);
      // if (response.status === 80200) {
      console.log('QnaList 성공' + response.data);
      const list = response.data;
      thunkAPI.dispatch(myPage.actions.getQnaList(list));
      //   return;
      // } else if (response.status === 80400) {
      //   window.alert('정보 조회 실패');
      //   console.log(response);
      //   return;
      // }
    } catch (error: any) {
      console.log('getQnaListApi : error response', error.response.data);
    }
  },
);

export const getMyCommentListApi = createAsyncThunk(
  'mypage/commentlist',
  async (data, thunkAPI) => {
    try {
      const response = await mypageAPI.getCommentList(data);
      if (response.status === 80200) {
        console.log('CommentList 성공' + response.data);
        const list = response.data;
        thunkAPI.dispatch(myPage.actions.getMyCommentList(list));
        return;
      } else if (response.status === 80400) {
        window.alert('정보 조회 실패');
        console.log(response);
        return;
      }
    } catch (error: any) {
      console.log('getCommentListApi : error response', error.response.data);
    }
  },
);

export const getLikeListApi = createAsyncThunk(
  'mypage/likelist',
  async (data, thunkAPI) => {
    try {
      const response = await mypageAPI.getLikeList(data);
      if (response.status === 80200) {
        console.log('LikeList 성공' + response.data);
        const list = response.data;
        thunkAPI.dispatch(myPage.actions.getLikeList(list));
        return;
      } else if (response.status === 80400) {
        window.alert('정보 조회 실패');
        console.log(response);
        return;
      }
    } catch (error: any) {
      console.log('getLikeListApi : error response', error.response.data);
    }
  },
);

export const getBookmarkListApi = createAsyncThunk(
  'mypage/bookmarklist',
  async (data, thunkAPI) => {
    try {
      const response = await mypageAPI.getBookmarkList(data);
      if (response.status === 80200) {
        console.log('LikeList 성공' + response.data);
        const list = response.data;
        thunkAPI.dispatch(myPage.actions.getBookmarkList(list));
        return;
      } else if (response.status === 80400) {
        window.alert('정보 조회 실패');
        console.log(response);
        return;
      }
    } catch (error: any) {
      console.log('getBookmarkListApi : error response', error.response.data);
    }
  },
);

export const myPage = createSlice({
  name: 'myPageReducer',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<any>) => {
      if (action.payload) {
        console.log('REDUCER : ' + action.payload);
        state.user.userNickname = action.payload.userNickname;
        state.user.userImg = action.payload.userImg;
        state.is_login = true;
      } else {
        console.log('REDUCER : 뭔가 문제가 있음... 아마도 페이로드가 없음...');
      }
      return;
    },
    getRehomingList: (state, action: PayloadAction<any>) => {
      console.log('REDUCER' + action.payload);
      state.mypage.myPostList.rehoming = action.payload;
      return;
    },
    getTradeList: (state, action: PayloadAction<any>) => {
      console.log('REDUCER' + action.payload);
      state.mypage.myPostList.trade = action.payload;
      return;
    },
    getQnaList: (state, action: PayloadAction<any>) => {
      console.log('REDUCER' + action.payload);
      state.mypage.myPostList.Qna = action.payload;
      return;
    },
    getMyCommentList: (state, action: PayloadAction<any>) => {
      console.log('REDUCER' + action.payload);
      state.mypage.myPostList.comment = action.payload;
      return;
    },
    getLikeList: (state, action: PayloadAction<any>) => {
      console.log('REDUCER' + action.payload);
      state.mypage.myPostList.like = action.payload;
      return;
    },
    getBookmarkList: (state, action: PayloadAction<any>) => {
      console.log('REDUCER' + action.payload);
      state.mypage.myPostList.bookmark = action.payload;
      return;
    },
  },
});

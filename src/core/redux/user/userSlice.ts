import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { mypageAPI, userAPI } from 'src/network/api';
import { User } from 'src/types/user';

export const initialState: User.UserType = {
  user: {
    userEmail: '',
    nickname: '',
    profileImgUrl:
      'https://pbs.twimg.com/profile_images/1116573617645424640/u5h2q3jv_400x400.png',
  },
  emailCheck: null,
  is_login: false,
};

// 회원가입
export const signUpApi = createAsyncThunk(
  'user/signup',
  async (data: User.UserInfo, thunkAPI) => {
    try {
      const response = await userAPI.signUp({ data });
      // if (response.status === 80200) {
      window.location.replace('/login');
      //바로 로그인 할 경우
      // thunkAPI.dispatch(logInApi({userEmail: user.userEmail, userNickname: user.userNickname}))
      // console.log('signUpApi : '+ response.status);
      // console.log('response : ' + response.data);
      // } else if (response.status === 80400) {
      // window.alert('이메일 형식이 아닙니다.');
      // console.log('signUpApi : '+ response.status);
      // console.log('response : ' + response.data);
      // return;
      // }
    } catch (error: any) {
      console.log('signUpApi : error response', error.response.data);
    }
  },
);

// 2024.01 회원 정보 조회
export const getProfileApi = createAsyncThunk(
  'user/profile',
  async (data: any, thunkAPI) => {
    try {
      const response = await mypageAPI.getProfile();
      console.log('getProfile 성공 ' + JSON.stringify(response.data.data));
      localStorage.setItem('userInfo', JSON.stringify(response.data.data));
      thunkAPI.dispatch(userSlice.actions.getProfile(response.data.data));
    } catch (error: any) {
      console.log('getProfileApi : error response', error.response.data);
    }
  },
);

// 중복체크
export const emailCheckApi = createAsyncThunk(
  'user/emailcheck',
  async (email: string, thunkAPI) => {
    try {
      const response = await userAPI.emailCheck(email);
      thunkAPI.dispatch(userSlice.actions.emailDpCheck(true));
      return true;
    } catch (error) {
      thunkAPI.dispatch(userSlice.actions.emailDpCheck(false));
      return false;
    }
  }
);

// 로그인
export const logInApi = createAsyncThunk(
  'user/login',
  async (user: User.UserInfo, thunkAPI) => {
    try {
      const data = {
        userEmail: user.userEmail,
        password: user.userPassword,
      };
      const response = await userAPI.logIn({ data });
      console.log('logInApi : response', response);
      const accessToken = response.headers.authorization?.split('Bearer ')[1];
      const refreshToken = response.headers.refreshtoken;
      if (accessToken && refreshToken) {
      // if (accessToken) { 
        if (user.checked) {
        }
        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('refreshToken', refreshToken);
        thunkAPI.dispatch(userSlice.actions.setUser(response));
        console.log(response.headers);
        return true;
      }
    } catch (error: any) {
      console.log('logInApi : error response', error.response.data);
      return false;
    }
  },
);

export const refresh = createAsyncThunk(
  'user/refresh',
  async (user: '', thunkAPI) => {
    try {
      const access = 'Bearer '+localStorage.getItem('accessToken');
      const refresh = localStorage.getItem('refreshToken');
      const response = await userAPI.refresh({access, refresh});
      const accessToken = response.headers.authorization?.split('Bearer ')[1];
      return true;
    } catch (error: any) {
      console.error('token refresh failed', error.response.data);
      return false;
    }
  },
);

// 카카오 로그인
export const kakaoLogInApi = createAsyncThunk(
  'user/login/kakao',
  async (code: string, thunkAPI) => {
    try {
      console.log('코드 : ' + JSON.stringify(code));
      const response = await userAPI.KakaoLogIn(code);
      const accessToken = response.headers.authorization?.split('Bearer ')[1];
      const refreshToken = response.headers.refreshToken;
      if (accessToken && refreshToken) {
        console.log('토큰토큰 : ' + accessToken);
        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('refreshToken', refreshToken);
        window.location.replace('/');
        return;
      }
    } catch (error: any) {
      console.log('kakaoLogInApi : error response', error.response.data);
    }
  },
);

export const logOutApi = createAsyncThunk(
  'user/login/kakao',
  async (data: '', thunkAPI) => {
    try {
      const accessToken = localStorage.getItem('accessToken');
      const refreshToken = localStorage.getItem('refreshToken');
      localStorage.removeItem('accessToken');
      window.location.replace('/');
      // if (accessToken && refreshToken) {
      //   // const response = await userAPI.logout(data);
      //   localStorage.removeItem('accessToken');
      //   localStorage.removeItem('refreshToken');
      //   thunkAPI.dispatch(userSlice.actions.logout(''));
      //   window.location.replace('/');
      // }
    } catch (error: any) {
      console.log('kakaoLogInApi : error response', error.response.data);
    }
  },
);

export const userSlice = createSlice({
  name: 'userReducer',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<any>) => {
      if (action.payload) {
        state.user = action.payload;
        state.is_login = true;
        return;
      } else {
        window.alert('로그인중인데 뭔가 문제가 있다... 아마도 페이로드가 없음');
      }
    },
    emailDpCheck: (state, action: PayloadAction<boolean | null>) => {
      state.emailCheck = action.payload;
    },
    getProfile: (state, action: PayloadAction<any>) => {
      state.user = action.payload;
    },
    logout: (state, action: PayloadAction<any>) => {
      state = {
        user: {
          userEmail: '',
          userNickname: '',
          userImg: '',
        },
        emailCheck: null,
        is_login: false,
      };
      return;
    },
  },
});

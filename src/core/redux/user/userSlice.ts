import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { userAPI } from 'src/network/api';
import { User } from 'src/types/user';

export interface ParamType {
  userEmail?: string;
  userNickName?: string;
  userPassword?: string;
  userPasswordCheck?: string;
  userImg?: string;
  userLocation?: string;
}

export interface UserType {
  user: User.UserInfo;
  is_login?: boolean;
  emailCheck?: boolean;
}

export const initialState: UserType = {
  user: {
    userEmail: 'email@email.com',
    userNickName: 'nickname',
    userPassword: 'password',
    userPasswordCheck: 'password',
    userImg:
      'https://pbs.twimg.com/profile_images/1116573617645424640/u5h2q3jv_400x400.png',
    userLocation: '',
  },
  emailCheck: false,
  is_login: false,
};

// 회원가입
export const signUpApi = createAsyncThunk(
  'USER_SIGNUP',
  async (user: ParamType, thunkAPI) => {
    try {
      const response = await userAPI.signUp(user);
      console.log('signUpApi : userdata', user);
      console.log('signUpApi : response', response.data);
    } catch (err: any) {
      console.log('signUpApi : error response', err.response.data);
    }
  },
);

// 중복체크
export const emailCheckApi = createAsyncThunk(
  'user/emailcheck',
  async (email: string, thunkAPI) => {
    try {
      const response = {
        status: 80200,
      }
      // const response = await userAPI.emailCheck(email);
      if (response.status === 80200) {
        thunkAPI.dispatch(userSlice.actions.emailDpCheck(true));
      } else if (response.status === 80400) {
        window.alert("중복된 이메일");
      }
      console.log('emailCheckApi : response', response);
    } catch (err: any) {
      console.log('emailCheckApi : error response', err.response);
    }
  },
);

// 로그인
export const logInApi = createAsyncThunk(
  'USER_LOGIN',
  async (user: ParamType, thunkAPI) => {
    try {
      const response = {
        userEmail: user.userEmail,
        userNickname: user.userNickName,
      };
      const token = ['BEARER ', 'token1234'];

      // const response = await userAPI.logIn(user);
      // const token = response.headers.authorization.split('BEARER ');
      // window.location.replace('/');
      console.log('logInApi : response', response);

      localStorage.setItem('token', token[1]);
      thunkAPI.dispatch(userSlice.actions.setUser(response));
    } catch (err: any) {
      console.log('logInApi : error response', err.response.data);
    }
  },
);

export const userSlice = createSlice({
  name: 'userReducer',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<any>) => {
      state.user = action.payload;
      state.is_login = true;
      return;
    },
    emailDpCheck: (state, action: PayloadAction<any>) => {
      console.log(action.payload);
      state.emailCheck = action.payload;
      return;
    }
  },
});

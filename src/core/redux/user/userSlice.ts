import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { userAPI } from 'src/network/api';
import { User } from 'src/types/user';

export interface ParamType {
  userEmail?: string;
  userNickname?: string;
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
    userNickname: 'nickname',
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
  'user/signup',
  async (user: ParamType, thunkAPI) => {
    try {
      
      const response = {
        status: 80200,
      };
      // const response = await userAPI.signUp(user);
      if (response.status === 80200) {
        // console.log('signUpApi : '+ response.status);
        // console.log('response : ' + response.data);
        // window.location.replace('/login');
        //바로 로그인 할 경우
        thunkAPI.dispatch(logInApi({userEmail: user.userEmail, userNickname: user.userNickname}))
      } else if (response.status === 80400) {
        // console.log('signUpApi : '+ response.status);
        // console.log('response : ' + response.data);
        return;
      };
    } catch (error: any) {
      console.log('signUpApi : error response', error.response.data);
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
    } catch (error: any) {
      console.log('emailCheckApi : error response', error.response);
    }
  },
);

// 로그인
export const logInApi = createAsyncThunk(
  'user/login',
  async (user: ParamType, thunkAPI) => {
    try {
      const response = {
        userEmail: user.userEmail,
        userNickname: user.userNickname,
      };
      const token = ['BEARER ', 'token1234'];
      // const response = await userAPI.logIn(user);
      // const token = response.headers.authorization?.split('BEARER ');
      // window.location.replace('/');
      console.log('logInApi : response', response);

      localStorage.setItem('token', token[1]);
      thunkAPI.dispatch(userSlice.actions.setUser(response));
    } catch (error: any) {
      console.log('logInApi : error response', error.response.data);
    }
  },
);

// 카카오 로그인
export const kakaoLogInApi = createAsyncThunk(
  'user/login/kakao',
  async (code: string, thunkAPI) => {
    try {
      // const response = await userAPI.KakaoLogIn(code);
      // const token = response.headers.authorization?.split('BEARER ');
      // localStorage.setItem('token', token[1]);
      window.location.replace('/');
    } catch(error: any) {
      console.log('kakaoLogInApi : error response', error.response.data);
    };
  }
)






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

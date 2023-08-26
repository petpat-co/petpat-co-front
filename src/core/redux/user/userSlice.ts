import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { userAPI } from 'src/network/api';
import { User } from 'src/types/user';
import jwtDecode from 'jwt-decode';


export const initialState: User.UserType = {
  user: {
    userEmail: '',
    userNickname: '',
    // userpassword를 저장해놓는게 맞나...?
    // userPassword: 'password!123',
    // userPasswordCheck: 'password!123',
    userImg:
      'https://pbs.twimg.com/profile_images/1116573617645424640/u5h2q3jv_400x400.png',
  },
  emailCheck: false,
  is_login: false,
};

 
// 회원가입
export const signUpApi = createAsyncThunk(
  'user/signup',
  async (data: User.UserInfo, thunkAPI) => {
    try {
      const response = await userAPI.signUp({ data });
      if (response.status === 80200) {
        window.location.replace('/login');
        //바로 로그인 할 경우
        // thunkAPI.dispatch(logInApi({userEmail: user.userEmail, userNickname: user.userNickname}))
        // console.log('signUpApi : '+ response.status);
        // console.log('response : ' + response.data);
      } else if (response.status === 80400) {
        window.alert('이메일 형식이 아닙니다.');
        // console.log('signUpApi : '+ response.status);
        // console.log('response : ' + response.data);
        return;
      }
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
      const response = await userAPI.emailCheck(email);
      thunkAPI.dispatch(userSlice.actions.emailDpCheck(true));
      // if (response.status === 80200) {
      // thunkAPI.dispatch(userSlice.actions.emailDpCheck(true));
      // } else if (response.status === 80400) {
      // window.alert('이미 사용중인 이메일 입니다.');
      // }
      console.log('emailCheckApi : response', response);
    } catch (error: any) {
      console.log('emailCheckApi : error response', error.response);
    }
  },
);

// 로그인
export const logInApi = createAsyncThunk(
  'user/login',
  async (user: User.UserInfo, thunkAPI) => {
    try {
      const data = {
          userEmail: user.userEmail,
          password: user.userPassword,
        }
        const response = await userAPI.logIn({ data });
        console.log('logInApi : response', response);
        const token = response.headers.authorization?.split('Bearer ');
      if (token) {
        if (user.checked) {

        };
        localStorage.setItem('token', token[1]);
        thunkAPI.dispatch(userSlice.actions.setUser(response));
        window.location.replace('/');
        return;
      }
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
      console.log('코드 : ' + JSON.stringify(code));
      const response = await userAPI.KakaoLogIn(code);
      const token = response.headers.authorization?.split('Bearer ')[1];
      if (token) {
        console.log('토큰토큰 : ' + token);
        localStorage.setItem('token', token);
        // window.location.replace('/');
        const data = jwtDecode(token);
        console.log(data);
      }
    } catch (error: any) {
      console.log('kakaoLogInApi : error response', error.response.data);
    }
  },
);

export const logOutApi = createAsyncThunk(
  'user/login/kakao',
  async (data: "", thunkAPI) => {
    try {
      const token = localStorage.getItem("token");
      if (token) {
        localStorage.removeItem("token");
        thunkAPI.dispatch(userSlice.actions.logout(""));
        window.location.replace('/');
      }
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
        window.alert("로그인중인데 뭔가 문제가 있다... 아마도 페이로드가 없음");
      }
    },
    emailDpCheck: (state, action: PayloadAction<any>) => {
      console.log(action.payload);
      state.emailCheck = action.payload;
      return;
    },
    logout: (state, action: PayloadAction<any>) => {
      state = {
        user: {
          userEmail: '',
          userNickname: '',
          userImg:
            '',
        },
        emailCheck: false,
        is_login: false,
      };
      return;
    },
  },
});

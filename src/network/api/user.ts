import instance from '../instance';
import { AddPrefix, ApiHandler } from '../type/api';

const addPrefix: AddPrefix = (path) => {
  return 'api/v1/user' + path;
};

// 회원가입
export const signUp: ApiHandler = (options) =>
  instance({
    method: 'POST',
    url: addPrefix('/signup'),
    ...options,
  });

// 이메일 중복확인
export const emailCheck: ApiHandler = (options) =>
  instance({
    method: 'POST',
    url: addPrefix(`/${options}`),
    ...options,
  });

export const getProfile: ApiHandler = (options) =>
  instance({
    method: 'GET',
    url: addPrefix(''),
    ...options,
  });

// 로그인
export const logIn: ApiHandler = (options) =>
  instance({
    method: 'POST',
    url: addPrefix('/login'),
    ...options,
  });

// 카카오 로그인
export const KakaoLogIn: ApiHandler = (options) =>
  instance({
    method: 'GET',
    url: addPrefix(`/kakao/callback?code=${options}`),
  });

export const logout: ApiHandler = (options) =>
  instance({
    method: 'GET',
    url: addPrefix(``),
  });

export const access: ApiHandler = (options:any) =>
{
  console.log("토큰이없으면대체뭐가잇는데1");
  console.log(options);
  return instance({
    method: 'POST',
    data: options,
    url: 'api/v1/accessToken',
    ...options,
  });
}

export const refresh: ApiHandler = (options) =>
{
  console.log("토큰이없으면대체뭐가잇는데2");
  console.log(options);
  return instance({
    method: 'POST',
    data: options,
    url: 'api/v1/refreshToken',
    ...options,
  });
}
  
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

export const refresh: ApiHandler = (options) =>
{
  return instance({
    method: 'POST',
    url: 'api/v1/accessToken',
    ...options,
  });
}
  
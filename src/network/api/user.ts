import instance from '../instance';
import { AddPrefix, ApiHandler } from '../type/api';

const addPrefix: AddPrefix = (path) => {
  return 'api/v1/user' + path;
};

// 회원가입
export const signUp: ApiHandler = (options) =>
  instance({
    method: 'POST',
    url: `http://localhost:8082/api/v1/user/signup`,
    ...options,
  });

// 이메일 중복확인
export const emailCheck: ApiHandler = (options) =>
  instance({
    method: 'POST',
    url: `http://localhost:8082/api/v1/user/${options}`,
    ...options,
  });

export const getProfile: ApiHandler = (options) =>
  instance({
    method: 'GET',
    url: `http://121.141.140.90:8082/api/v1/profile`,
    ...options,
  });

// 로그인
export const logIn: ApiHandler = (options) =>
  instance({
    method: 'POST',
    url: 'http://121.141.140.90:8082/api/v1/user/login',
    ...options,
  });

// 카카오 로그인
export const KakaoLogIn: ApiHandler = (options) =>
  instance({
    method: 'GET',
    url: `http://121.141.140.90:8082/api/v1/user/kakao/callback?code=${options}`,
  });

export const logout: ApiHandler = (options) =>
  instance({
    method: 'GET',
    url: ``,
  });

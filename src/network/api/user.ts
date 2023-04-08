import instance from '../instance';
import { AddPrefix, ApiHandler } from '../type/api';

const addPrefix: AddPrefix = (path) => {
  return 'api/v1/user' + path;
};

// 회원가입
export const signUp: ApiHandler = (options) =>
  instance({
    method: 'POST',
    url: addPrefix(`/signup`),
    ...options,
  });

// 이메일 중복확인
export const emailCheck: ApiHandler = (options) =>
  instance({
    method: 'POST',
    url: addPrefix(`/${options.parameter.useremail}`),
    ...options,
  });

  // 로그인
export const logIn: ApiHandler = (options) =>
  instance({
    method: 'POST',
    url: addPrefix(`/login`),
    ...options,
  });

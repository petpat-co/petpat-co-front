import axios from 'axios';
import { config } from './config';

const instance = axios.create({
  baseURL: config.server.host,
  timeout: 20000,
  // withCredentials: false,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json; charset=UTF-8',
    accept: 'application/json',
  },
});

// instance.interceptors.request.use(
//   function (config) {
//     return config;
//   },
//   function (error) {
//     return Promise.reject(error);
//   },
// );

//2. 요청 인터셉터
instance.interceptors.request.use(
  //요청직전 호출
  (config) => {
    // const Token = localStorage.getItem('token');
    const accessToken = localStorage.getItem('accessToken');
    const refreshToken = localStorage.getItem('refreshToken');

    config.headers = {
      ...config.headers,
      Accept: 'application/json', // 이 부분은 모든 요청에 공통적으로 적용됩니다.
    };

    // token 있는 경우 request, else console.error
    // formdata의 인스턴스인경우 멀티파트, 그 외 json
    if (config.data instanceof FormData) {
      config.headers['Content-Type'] = 'multipart/form-data';
    } else {
      config.headers['Content-Type'] = 'application/json; charset=UTF-8';
    }
    // token setting
    // if(accessToken && refreshToken) {
    if (accessToken) {
      config.headers['Authorization'] = `Bearer ${accessToken}`;
    } else {
      console.error('[REQUEST INTERCEPTOR] - TOKEN 확인되지 않음');
    }
    return config;
  },
  //에러 전 호출
  (err) => {
    return Promise.reject(err);
  },
);

instance.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    return Promise.reject(error);
  },
);

export default instance;

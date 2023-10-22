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

    if(accessToken && refreshToken) {
      config.headers = {
        'Content-Type': 'application/json; charset=UTF-8',
        accept: 'application/json',
        Authorization: `Bearer ${accessToken}`,
        RefreshToken: `${refreshToken}`,
      };
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

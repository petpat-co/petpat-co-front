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
      config.headers['refreshToken'] = refreshToken;
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

    if (error.response && error.response.status === 401) {
      const refreshToken = localStorage.getItem('refreshToken');
      if (refreshToken) {
        return axios.create()({
          method: 'POST',
          url: `${config.server.host}/api/v1/accessToken`,
          headers: {
            'Content-Type': 'application/json; charset=UTF-8',
            'Accept': 'application/json',
            'refreshToken': refreshToken,
          }
        }).then(response => {
          const { accessToken } = response.data;
          localStorage.setItem('accessToken', accessToken);
          error.config.headers['Authorization'] = `Bearer ${accessToken}`;
          return instance(error.config); 
        }).catch(error => {
          console.error('token refresh failed:', error);
          return Promise.reject(error);
        });
      }
    }
    return Promise.reject(error);
  },
);

export default instance;

import { config } from '../config';
import instance from '../instance';
import { AddPrefix, ApiHandler } from '../type/api';

const addPrefix: AddPrefix = (path) => {
  return config.server.host + '/api/v1/trade' + path;
};

const Token = localStorage.getItem('token');

// 물품 목록조회
export const getTradeList: ApiHandler = (
  options, // pageNo
) =>
  instance({
    headers: {
      Authorization: `Bearer ${Token}`,
    },
    method: 'GET',
    url: addPrefix('?page=0'),
    ...options,
  });

// 물품 상세조회
export const getTradeDetail: ApiHandler = (
  options, // id
) =>
  instance({
    headers: {
      Authorization: `Bearer ${Token}`,
    },
    method: 'GET',
    url: addPrefix(`/${options}`),
    ...options,
  });

// 물품 등록
export const postTrade: ApiHandler = (
  options, // postData
) =>
  instance({
    method: 'POST',
    url: addPrefix(''),
    ...options,
  });

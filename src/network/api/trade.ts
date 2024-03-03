import { config } from '../config';
import instance from '../instance';
import { AddPrefix, ApiHandler } from '../type/api';

const addPrefix: AddPrefix = (path) => {
  return config.server.host + '/api/v1' + path;
};

const Token = localStorage.getItem('token');

// 물품 목록조회
export const getTradeList: ApiHandler = (
  options, // pageNo
) =>
  instance({
    // TODO: 토큰 공통으로 처리 필요
    headers: {
      Authorization: `Bearer ${Token}`,
    },
    method: 'GET',
    url: addPrefix(`/trade?page=${options.pageNo}`),
    ...options,
  });

// 금주 관심물품 목록 조회
export const getBestTradeList: ApiHandler = (options) =>
  instance({
    headers: {
      Authorization: `Bearer ${Token}`,
    },
    method: 'GET',
    url: addPrefix('/trade/trending'),
    ...options,
  });

// 물품 상세조회
export const getTradeDetail: ApiHandler = (
  options, // tradeId
) =>
  instance({
    headers: {
      Authorization: `Bearer ${Token}`,
    },
    method: 'GET',
    url: addPrefix(`/trade/${options.tradeId}`),
    ...options,
  });

// 물품 등록
export const postTrade: ApiHandler = (
  options, // postData
) =>
  instance({
    method: 'POST',
    url: addPrefix(''),
    data: options,
    headers: {
      Authorization: `Bearer ${Token}`,
      'Content-Type': 'multipart/form-data',
    },
    ...options,
  });

export const tradeCategoryList: ApiHandler = (
  options, // categoryId
) =>
  instance({
    headers: {
      Authorization: `Bearer ${Token}`,
    },
    method: 'GET',
    url: addPrefix(`/trade/category/${options.categoryId}`),
    ...options,
  });

import { config } from '../config';
import instance from '../instance';
import { AddPrefix, ApiHandler } from '../type/api';

const addPrefix: AddPrefix = (path) => {
  return config.server.host + '/api/v1/trade' + path;
};

const Token = localStorage.getItem('token');

export const getTradeList: ApiHandler = (
  options, // pageNo
) =>
  instance({
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${Token}`,
    },
    method: 'GET',
    url: addPrefix('?page=0'),
    ...options,
  });

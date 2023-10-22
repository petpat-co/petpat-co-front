import { config } from '../config';
import instance from '../instance';
import { AddPrefix, ApiHandler } from '../type/api';

const addPrefix: AddPrefix = (path) => {
  return config.server.host + '/api/v1/qna' + path;
};

export const getQnaList: ApiHandler = (options) =>
  instance({
    method: 'GET',
    url: addPrefix(`/${options}`),
    ...options,
  });

export const getQnaDetail: ApiHandler = (options) =>
  instance({
    method: 'GET',
    url: addPrefix(`/detail/${options}`),
    ...options,
  });

export const postQna: ApiHandler = (options) =>
  instance({
    method: 'POST',
    url: addPrefix(`/${options}`),
    ...options,
  });

export const modifyQna: ApiHandler = (options) =>
  instance({
    method: 'PUT',
    url: addPrefix(`/${options.postId}`),
    ...options,
  });
  
  export const deleteQna: ApiHandler = (options) =>
  instance({
    method: 'DELETE',
    url: addPrefix(`/${options}`),
    ...options,
  });

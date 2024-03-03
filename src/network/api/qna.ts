import { config } from '../config';
import instance from '../instance';
import { AddPrefix, ApiHandler } from '../type/api';

const addPrefix: AddPrefix = (path) => {
  return config.server.host + '/api/v1/qna' + path;
};

export const getQnaList: ApiHandler = (
  options, // pageNo
) =>
  instance({
    method: 'GET',
    // url: addPrefix(`/${options}`),
    url: addPrefix('?page=0'),
    ...options,
  });

export const getQnaDetail: ApiHandler = (
  options, // postId
) =>
  instance({
    method: 'GET',
    url: addPrefix(`/detail?postId=${options}`),
    ...options,
  });

export const postQna: ApiHandler = (
  options, // postData
) =>
  instance({
    method: 'POST',
    url: addPrefix(''),
    ...options,
  });

export const modifyQna: ApiHandler = (
  options, // postId, postData
) =>
  instance({
    method: 'PUT',
    data: options.formData,
    url: addPrefix(`/${options.postId}`),
  });

export const deleteQna: ApiHandler = (
  options, // postId
) =>
  instance({
    method: 'DELETE',
    url: addPrefix(`/${options}`),
    ...options,
  });

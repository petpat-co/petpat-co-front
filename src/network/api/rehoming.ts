import instance from '../instance';
import { AddPrefix, ApiHandler } from '../type/api';

const addPrefix: AddPrefix = (path) => {
  return '/api/v1/rehoming' + path;
};

//분양글 조회
export const getReHomingList: ApiHandler = (options) =>
  instance({
    method: 'GET',
    url: addPrefix(``),
    ...options,
  });

//분양글쓰기
export const addReHoming: ApiHandler = (options) =>
  instance({
    method: 'POST',
    url: addPrefix(''),
    ...options,
  });

//분양글 상세 조회
export const getOneReHoming: ApiHandler = (options) =>
  instance({
    method: 'GET',
    url: addPrefix(`/detail`),
    ...options,
  });

//분양글 수정
export const editReHoming: ApiHandler = (options) =>
  instance({
    method: 'PUT',
    url: `/api/rehoming/${options.parameter.postId}`,
    ...options,
  });

//분양글 삭제
export const deleteReHoming: ApiHandler = (options) =>
  instance({
    method: 'DELETE',
    url: `/api/rehoming/${options.parameter.postId}`,
    ...options,
  });

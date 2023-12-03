import instance from '../instance';
import { AddPrefix, ApiHandler } from '../type/api';

const addPrefix: AddPrefix = (path) => {
  return '/api/v1/rehoming' + path;
};

//분양글 목록 조회
export const getReHomingList: ApiHandler = (options) =>
  instance({
    method: 'GET',
    url: addPrefix(`?page=${options}`),
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
    url: addPrefix(`/detail?postId=${options}`),
    ...options,
  });

//분양글 수정
export const editReHoming: ApiHandler = (options) =>
  instance({
    method: 'PUT',
    url: addPrefix(`/${options.parameter.postId}`),
    ...options,
  });

//분양글 삭제
export const deleteReHoming: ApiHandler = (options) =>
  instance({
    method: 'DELETE',
    url: addPrefix(`?postId=${options}`),
    ...options,
  });

// 분양 카테고리 리스트 조회
export const getRehomingCategory: ApiHandler = (options) =>
  instance({
    method: 'GET',
    // url: `/api/v1/categoryGroup/${options}`,
    url: `/api/v1/rehoming/category/1`,
    ...options,
  });

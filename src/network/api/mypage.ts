import instance from '../instance';
import { AddPrefix, ApiHandler } from '../type/api';
// import { config } from '../config';

const addPrefix: AddPrefix = (path) => {
  return '/api/v1/profile' + path;
};

// 유저 정보 변경
export const modifyProfile: ApiHandler = (options) =>
  instance({
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${Token}`,
    },
    method: 'PUT',
    url: addPrefix(``),
    ...options,
  });

// 비밀번호 체크
const Token = localStorage.getItem('token');
export const checkPW: ApiHandler = (options) =>
  instance({
    method: 'POST',
    url: addPrefix(`/password`),
    ...options,
  });

// 비밀번호 변경
export const changePW: ApiHandler = (options) =>
  instance({
    headers: {
      Authorization: `Bearer ${Token}`,
    },
    method: 'PUT',
    url: addPrefix(`/password`),
    ...options,
  });

// 작성 게시글 조회
export const getRehomingList: ApiHandler = () =>
  instance({
    method: 'GET',
    url: addPrefix(`/rehoming`),
  });
// 작성 게시글 조회
export const getTradeList: ApiHandler = (options) =>
  instance({
    method: 'GET',
    url: addPrefix(`/trade`),
    ...options,
  });
// 작성 게시글 조회
export const getQnaList: ApiHandler = (options) =>
  instance({
    method: 'GET',
    url: addPrefix(`/qna`),
    ...options,
  });

// 좋아요 조회
export const getLikeList: ApiHandler = (options) =>
  instance({
    method: 'GET',
    //postType...?
    url: addPrefix(`/like/postType=REHOMING`),
    ...options,
  });

// 북마크 리스트 조회
export const getBookmarkList: ApiHandler = (options) =>
  instance({
    method: 'GET',
    url: addPrefix(`/bookmark/postType=REHOMING`),
    ...options,
  });

  // 작성 댓글 조회
export const getCommentList: ApiHandler = (options) =>
instance({
  method: 'GET',
  url: addPrefix(``),
  ...options,
});

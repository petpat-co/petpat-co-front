import { config } from '../config';
import instance from '../instance';
import { AddPrefix, ApiHandler } from '../type/api';

const Token = localStorage.getItem('token');

const addPrefix: AddPrefix = (path) => {
  return config.server.host + '/api/v1' + path;
};

// 목록조회
export const getPostList: ApiHandler = (
  options, // pageNo, postType
) =>
  instance({
    // TODO: 토큰 공통으로 처리 필요
    headers: {
      Authorization: `Bearer ${Token}`,
    },
    method: 'GET',
    url: addPrefix(`/${options.postType}?page=${options.pageNo}`),
    ...options,
  });

// 상세조회
export const getOnePost: ApiHandler = (
  options, //postType, postId
) =>
  instance({
    method: 'GET',
    url:
      options.postType === 'trade'
        ? addPrefix(`/${options.postType}/${options.postId}`)
        : addPrefix(`/${options.postType}/detail?postId=${options.postId}`),
    ...options,
  });

export const addPost: ApiHandler = (
  options,
) => 
  instance({
    method: 'POST',
    url: addPrefix(`/${options.postType}`),
    data: options.formData,
  })


// 수정
export const updatePost: ApiHandler = (
  options, // postId, postType, postData
) =>
  instance({
    method: 'PUT',
    url:
      options.postType === 'trade'
        ? addPrefix(`/${options.postType}/${options.postId}`)
        : addPrefix(`/${options.postType}/detail?postId=${options.postId}`),
    ...options.formData,
  });

// 삭제
export const deletePost: ApiHandler = (
  options, // postId
) =>
  instance({
    method: 'DELETE',
    url:
      options.postType === 'trade'
        ? addPrefix(`/${options.postType}/${options.postId}`)
        : addPrefix(`/${options.postType}?postId=${options.postId}`),
    ...options,
  });

// 좋아요
export const likePost: ApiHandler = (
  options, // postType, postId
) =>
  instance({
    method: 'POST',
    url: addPrefix(`/likes/${options.postType}/${options.postId}`),
    ...options,
  });

// 북마크
export const bookmarkPost: ApiHandler = (
  options, // postId
) =>
  instance({
    method: 'POST',
    url: addPrefix(`/bookmarks/${options.postType}/${options.postId}`),
    ...options,
  });

// 인기있는 게시물 조회
export const getBannerList: ApiHandler = (
  options, // postType
) =>
  instance({
    headers: {
      Authorization: `Bearer ${Token}`,
    },
    method: 'GET',
    url: addPrefix(`/${options.postType}/trending`),
    ...options,
  });

// 카테고리 조회
export const getCategoryList: ApiHandler = (
  options, // postType
) =>
  instance({
    headers: {
      Authorization: `Bearer ${Token}`,
    },
    method: 'GET',
    url: addPrefix(`/${options.postType}/categoryList`),
    // url: addPrefix(`/trade/category/${options.categoryId}`),
    ...options,
  });

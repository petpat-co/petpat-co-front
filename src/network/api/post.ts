import { config } from '../config';
import instance from '../instance';
import { AddPrefix, ApiHandler } from '../type/api';

const addPrefix: AddPrefix = (path) => {
  return config.server.host + '/api/v1' + path;
};

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
  options, // postId
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

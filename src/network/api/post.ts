import { ApiHandler } from '../type/api';
import instance from '../instance';
import { config } from '../config';

const Token = localStorage.getItem('token');

// 좋아요 등록
export const postLikedStatus: ApiHandler = (
  options, // postType, id
) =>
  instance({
    headers: {
      Authorization: `Bearer ${Token}`,
    },
    method: 'POST',
    url: `${config.server.host}/api/v1/likes/${options.postType}/${options.id}`,
    ...options,
  });

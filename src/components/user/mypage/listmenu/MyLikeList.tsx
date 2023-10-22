import React, { ReactElement } from 'react';
import PostList from 'src/components/shared/list/PostList';
import { getLikeListApi } from 'src/core/redux/user/myPage';
import { useAppDispatch } from 'src/core/store';

const MyLikeList = (): ReactElement => {
  const list = [
    {
      title: '내가좋아한글',
      nickname: '닉네임',
      view: '32',
      comment: '2',
      date: '2023.08.22',
    },
  ];
  const appdispatch = useAppDispatch();
  React.useEffect(() => {
    appdispatch(getLikeListApi());
  }, [appdispatch])
  return (
    <>
      <PostList list={list}/>
    </>
  );
};

export default MyLikeList;

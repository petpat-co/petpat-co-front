import React, { ReactElement } from 'react';
import PostList from 'src/components/shared/list/PostList';
import { getBookmarkListApi } from 'src/core/redux/user/myPage';
import { useAppDispatch } from 'src/core/store';

const MyBookmarkList = (): ReactElement => {
  const appdispatch = useAppDispatch();
  const list = [
    {
      title: '내가북마크한글',
      nickname: '닉네임',
      view: '32',
      comment: '2',
      date: '2023.08.22',
    },
  ];
  
  React.useEffect(() => {
    appdispatch(getBookmarkListApi());
  }, [appdispatch])

  return (
    <>
      <PostList list={list}/>
    </>
  );
};

export default MyBookmarkList;

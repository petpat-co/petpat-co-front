import React, { ReactElement, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as S from './ReHomingTemplate.style';
import { useAppDispatch } from 'src/core/store';
import {
  getRehomingCategoryApi,
  getRehomingListApi,
} from 'src/core/redux/post/rehomingSlice';
import { useSelector } from 'react-redux';
import BoardTemplate from '../shared/board/BoardTemplate';
import styled from 'styled-components';

const RehomingTemplate = (): ReactElement => {
  const navigate = useNavigate();
  const appdispatch = useAppDispatch();

  const [pageno, setPageNo] = useState<number>(1);

  const categories = useSelector((state: any) => state?.rehoming?.category);
  const postList = useSelector((state: any) => state?.rehoming?.list);

  const onClickWrite = () => {
    navigate('/rehome/write');
  };

  React.useEffect(() => {
    appdispatch(getRehomingListApi(pageno));
    appdispatch(getRehomingCategoryApi('분양'));
  }, []);

  return (
    <BoardTemplate
      title={'분양 게시판'}
      buttonText={'분양 글쓰러가기'}
      onClick={() => navigate('/rehome/write')}
      bannerTitle={
        <>
          최근에 관심을
          <br />
          많이 받은 분양글
        </>
      }
      bannerContent={
        <>
          귀여운 아이들이
          <br />
          ㅇㅇ님의 관심을 기다리고 있어요!
        </>
      }
      bannerData={topRehomingList}
      postListData={postList}
    />
  );
};

export default RehomingTemplate;

const Container = styled.div`
  max-width: 1440px;
`

const topRehomingList = [
  {
    imagePath: 'https://img.hankyung.com/photo/202308/B20230809112130640.jpg',
    status: '모집중',
    title: '우리집 댕댕이가 새끼를 낳았다요요요요요용',
    nickname: '댕댕이집사',
    view: '100',
    comment: '100',
    postType: 'REHOMING',
    rehomingId: 1,
    userId: 1,
    description: '멍멍이 분양해요',
    petName: '왕왕',
    petAge: '2022년 10월 1일',
    category: '강아지',
    type: '푸들',
    gender: '여',
    location: '서울시 노원구',
    price: 20000,
    createdAt: '2023-01-17T16:43:07.603656',
    updatedAt: '2023-01-17T16:43:07.603656',
    viewCnt: 1,
    likeCnt: 0,
    bookmarkCnt: 1,
    bookmarked: true,
    liked: false,
  },
  {
    imagePath:
      'https://product.cdn.cevaws.com/var/storage/images/media/adaptil-2017/images/www-ww/shutterstock_395310793-3-2/3547034-1-www-WW/shutterstock_395310793-3-2.jpg',
    status: '모집중',
    title: '우리집 댕댕이가 새끼를 낳았다요요요요요용',
    nickname: '댕댕이집사',
    view: '100',
    comment: '100',
    postType: 'REHOMING',
    rehomingId: 2,
    userId: 1,
    description: '멍멍이 분양해요',
    petName: '왕왕',
    petAge: '2022년 10월 1일',
    category: '강아지',
    type: '푸들',
    gender: '여',
    location: '서울시 노원구',
    price: 20000,
    createdAt: '2023-01-17T16:43:07.603656',
    updatedAt: '2023-01-17T16:43:07.603656',
    viewCnt: 1,
    likeCnt: 0,
    bookmarkCnt: 1,
    bookmarked: true,
    liked: false,
  },
  {
    imagePath:
      'https://www.fitpetmall.com/wp-content/uploads/2023/10/b37132cb-8757-4678-b8f6-9f9e25cb04ca-1.png',
    status: '모집중',
    title: '우리집 댕댕이가 새끼를 낳았다요요요요요용',
    nickname: '댕댕이집사',
    view: '100',
    comment: '100',
    postType: 'REHOMING',
    rehomingId: 2,
    userId: 1,
    description: '멍멍이 분양해요',
    petName: '왕왕',
    petAge: '2022년 10월 1일',
    category: '강아지',
    type: '푸들',
    gender: '여',
    location: '서울시 노원구',
    price: 20000,
    createdAt: '2023-01-17T16:43:07.603656',
    updatedAt: '2023-01-17T16:43:07.603656',
    viewCnt: 1,
    likeCnt: 0,
    bookmarkCnt: 1,
    bookmarked: true,
    liked: false,
  },
];

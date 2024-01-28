// ** Import React
import React, { ReactElement, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../../core/store';

// ** Import components
import BoardTemplate from '../shared/board/BoardTemplate';

// ** Import api
import { getTradeListApi } from '../../core/redux/post/tradeSlice';
import { tradeAPI } from '../../network/api';

const initCategoryList = [
  { id: 0, categoryName: '강아지', categoryId: 4, detailCategoryList: [] },
  { id: 1, categoryName: '고양이', categoryId: 5, detailCategoryList: [] },
  { id: 2, categoryName: '공통/기타', categoryId: 6, detailCategoryList: [] },
];

const GoodsTradeTemplate = (): ReactElement => {
  const [pageNo, setPageNo] = useState<number>(0);
  const [tradeCategoryList, setTradeCategoryList] =
    useState<any>(initCategoryList);

  const navigate = useNavigate();
  const appDispatch = useAppDispatch();
  const postList = useSelector((state: any) => state.trade.list);

  useEffect(() => {
    // 게시글 데이터 페칭 처리
    appDispatch(getTradeListApi(pageNo));

    // 카테고리 목록 데이터 페칭 처리
    getTradeCategoryList();
  }, []);

  const getTradeCategoryList = () => {
    let updateCategoryList: any[] = [];

    Promise.all(
      (updateCategoryList = tradeCategoryList.map(async (category: any) => {
        let detailCategoryList = (
          await tradeAPI.tradeCategoryList({ categoryId: category.categoryId })
        ).data.data;

        return {
          id: category.id,
          categoryName: category.categoryName,
          categoryId: category.categoryId,
          detailCategoryList: detailCategoryList,
        };
      })),
    ).then((updateCategoryList) => {
      setTradeCategoryList(updateCategoryList);
      console.log('update list ==> ', updateCategoryList);
    });
  };

  return (
    <BoardTemplate
      title={'물품거래 게시판'}
      buttonText={'물품글 올리기'}
      onClick={() => navigate('/trade/write')}
      bannerTitle={
        <>
          이번주에 관심
          <br />
          많이 받은 물품들
        </>
      }
      bannerContent={
        <>
          다른 물품 둘러보기 전에
          <br />
          관심 많이 받은 게시글도 한 번 보고 가세요!
        </>
      }
      bannerData={tempBestDataList}
      postListData={postList}
      categoryListData={tradeCategoryList}
    />
  );
};

const tempBestDataList = [
  {
    imagePath: 'https://img.hankyung.com/photo/202308/B20230809112130640.jpg',
    status: '모집중',
    title: '우리집 댕댕이가 새끼를 낳았다요요요요요용 낳았다요요요요요용',
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
    region: '서울시 노원구',
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
    title: '우리집 댕댕이가 새끼를 낳았다요요요요요용낳았다요요요요요용',
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
    region: '서울시 노원구',
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
    region: '서울시 노원구',
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

// const tempPostDataList = [
//   {
//     imagePath:
//       'https://product.cdn.cevaws.com/var/storage/images/media/adaptil-2017/images/www-ww/shutterstock_395310793-3-2/3547034-1-www-WW/shutterstock_395310793-3-2.jpg',
//     status: '모집중',
//     title: '우리집 댕댕이가 새끼를 낳았다요요요요요용 낳았다요요요요요용',
//     nickname: '댕댕이집사',
//     view: '100',
//     comment: '100',
//     postType: 'REHOMING',
//     rehomingId: 1,
//     userId: 1,
//     description: '멍멍이 분양해요',
//     petName: '왕왕',
//     petAge: '2022년 10월 1일',
//     category: '강아지',
//     type: '푸들',
//     gender: '여',
//     region: '서울시 노원구',
//     price: 20000,
//     createdAt: '2023-01-17T16:43:07.603656',
//     updatedAt: '2023-01-17T16:43:07.603656',
//     viewCnt: 1,
//     likeCnt: 0,
//     bookmarkCnt: 1,
//     bookmarked: true,
//     liked: false,
//   },
//   {
//     imagePath:
//       'https://bareunnutri.com/files/attach/images/2022/08/25/27e4b09804f027e9d6f915f8c8d76152.jpg',
//     status: '모집중',
//     title: '우리집 댕댕이가 새끼를 낳았다요요요요요용',
//     nickname: '댕댕이집사',
//     view: '100',
//     comment: '100',
//     postType: 'REHOMING',
//     rehomingId: 2,
//     userId: 1,
//     description: '멍멍이 분양해요',
//     petName: '왕왕',
//     petAge: '2022년 10월 1일',
//     category: '강아지',
//     type: '푸들',
//     gender: '여',
//     region: '서울시 노원구',
//     price: 20000,
//     createdAt: '2023-01-17T16:43:07.603656',
//     updatedAt: '2023-01-17T16:43:07.603656',
//     viewCnt: 1,
//     likeCnt: 0,
//     bookmarkCnt: 1,
//     bookmarked: true,
//     liked: false,
//   },
//   {
//     imagePath: 'https://img.hankyung.com/photo/202308/B20230809112130640.jpg',
//     status: '모집중',
//     title: '우리집 댕댕이가 새끼를 낳았다요요요요요용',
//     nickname: '댕댕이집사',
//     view: '100',
//     comment: '100',
//     postType: 'REHOMING',
//     rehomingId: 2,
//     userId: 1,
//     description: '멍멍이 분양해요',
//     petName: '왕왕',
//     petAge: '2022년 10월 1일',
//     category: '강아지',
//     type: '푸들',
//     gender: '여',
//     region: '서울시 노원구',
//     price: 20000,
//     createdAt: '2023-01-17T16:43:07.603656',
//     updatedAt: '2023-01-17T16:43:07.603656',
//     viewCnt: 1,
//     likeCnt: 0,
//     bookmarkCnt: 1,
//     bookmarked: true,
//     liked: false,
//   },
//   {
//     imagePath:
//       'https://product.cdn.cevaws.com/var/storage/images/media/adaptil-2017/images/www-ww/shutterstock_395310793-3-2/3547034-1-www-WW/shutterstock_395310793-3-2.jpg',
//     status: '모집중',
//     title: '우리집 댕댕이가 새끼를 낳았다요요요요요용',
//     nickname: '댕댕이집사',
//     view: '100',
//     comment: '100',
//     postType: 'REHOMING',
//     rehomingId: 2,
//     userId: 1,
//     description: '멍멍이 분양해요',
//     petName: '왕왕',
//     petAge: '2022년 10월 1일',
//     category: '강아지',
//     type: '푸들',
//     gender: '여',
//     region: '서울시 노원구',
//     price: 20000,
//     createdAt: '2023-01-17T16:43:07.603656',
//     updatedAt: '2023-01-17T16:43:07.603656',
//     viewCnt: 1,
//     likeCnt: 0,
//     bookmarkCnt: 1,
//     bookmarked: true,
//     liked: false,
//   },
//   {
//     imagePath:
//       'https://www.fitpetmall.com/wp-content/uploads/2023/10/b37132cb-8757-4678-b8f6-9f9e25cb04ca-1.png',
//     status: '모집중',
//     title: '우리집 댕댕이가 새끼를 낳았다요요요요요용',
//     nickname: '댕댕이집사',
//     view: '100',
//     comment: '100',
//     postType: 'REHOMING',
//     rehomingId: 2,
//     userId: 1,
//     description: '멍멍이 분양해요',
//     petName: '왕왕',
//     petAge: '2022년 10월 1일',
//     category: '강아지',
//     type: '푸들',
//     gender: '여',
//     region: '서울시 노원구',
//     price: 20000,
//     createdAt: '2023-01-17T16:43:07.603656',
//     updatedAt: '2023-01-17T16:43:07.603656',
//     viewCnt: 1,
//     likeCnt: 0,
//     bookmarkCnt: 1,
//     bookmarked: true,
//     liked: false,
//   },
//   {
//     imagePath:
//       'https://bareunnutri.com/files/attach/images/2022/08/25/27e4b09804f027e9d6f915f8c8d76152.jpg',
//     status: '모집중',
//     title: '우리집 댕댕이가 새끼를 낳았다요요요요요용',
//     nickname: '댕댕이집사',
//     view: '100',
//     comment: '100',
//     postType: 'REHOMING',
//     rehomingId: 2,
//     userId: 1,
//     description: '멍멍이 분양해요',
//     petName: '왕왕',
//     petAge: '2022년 10월 1일',
//     category: '강아지',
//     type: '푸들',
//     gender: '여',
//     region: '서울시 노원구',
//     price: 20000,
//     createdAt: '2023-01-17T16:43:07.603656',
//     updatedAt: '2023-01-17T16:43:07.603656',
//     viewCnt: 1,
//     likeCnt: 0,
//     bookmarkCnt: 1,
//     bookmarked: true,
//     liked: false,
//   },
//   {
//     imagePath:
//       'https://bareunnutri.com/files/attach/images/2022/08/25/27e4b09804f027e9d6f915f8c8d76152.jpg',
//     status: '모집중',
//     title: '우리집 댕댕이가 새끼를 낳았다요요요요요용',
//     nickname: '댕댕이집사',
//     view: '100',
//     comment: '100',
//     postType: 'REHOMING',
//     rehomingId: 2,
//     userId: 1,
//     description: '멍멍이 분양해요',
//     petName: '왕왕',
//     petAge: '2022년 10월 1일',
//     category: '강아지',
//     type: '푸들',
//     gender: '여',
//     region: '서울시 노원구',
//     price: 20000,
//     createdAt: '2023-01-17T16:43:07.603656',
//     updatedAt: '2023-01-17T16:43:07.603656',
//     viewCnt: 1,
//     likeCnt: 0,
//     bookmarkCnt: 1,
//     bookmarked: true,
//     liked: false,
//   },
//
//   {
//     imagePath:
//       'https://www.fitpetmall.com/wp-content/uploads/2023/10/b37132cb-8757-4678-b8f6-9f9e25cb04ca-1.png',
//     status: '모집중',
//     title: '우리집 댕댕이가 새끼를 낳았다요요요요요용',
//     nickname: '댕댕이집사',
//     view: '100',
//     comment: '100',
//     postType: 'REHOMING',
//     rehomingId: 2,
//     userId: 1,
//     description: '멍멍이 분양해요',
//     petName: '왕왕',
//     petAge: '2022년 10월 1일',
//     category: '강아지',
//     type: '푸들',
//     gender: '여',
//     region: '서울시 노원구',
//     price: 20000,
//     createdAt: '2023-01-17T16:43:07.603656',
//     updatedAt: '2023-01-17T16:43:07.603656',
//     viewCnt: 1,
//     likeCnt: 0,
//     bookmarkCnt: 1,
//     bookmarked: true,
//     liked: false,
//   },
//   {
//     imagePath:
//       'https://bareunnutri.com/files/attach/images/2022/08/25/27e4b09804f027e9d6f915f8c8d76152.jpg',
//     status: '모집중',
//     title: '우리집 댕댕이가 새끼를 낳았다요요요요요용',
//     nickname: '댕댕이집사',
//     view: '100',
//     comment: '100',
//     postType: 'REHOMING',
//     rehomingId: 2,
//     userId: 1,
//     description: '멍멍이 분양해요',
//     petName: '왕왕',
//     petAge: '2022년 10월 1일',
//     category: '강아지',
//     type: '푸들',
//     gender: '여',
//     region: '서울시 노원구',
//     price: 20000,
//     createdAt: '2023-01-17T16:43:07.603656',
//     updatedAt: '2023-01-17T16:43:07.603656',
//     viewCnt: 1,
//     likeCnt: 0,
//     bookmarkCnt: 1,
//     bookmarked: true,
//     liked: false,
//   },
//   {
//     imagePath:
//       'https://product.cdn.cevaws.com/var/storage/images/media/adaptil-2017/images/www-ww/shutterstock_395310793-3-2/3547034-1-www-WW/shutterstock_395310793-3-2.jpg',
//     status: '모집중',
//     title: '우리집 댕댕이가 새끼를 낳았다요요요요요용',
//     nickname: '댕댕이집사',
//     view: '100',
//     comment: '100',
//     postType: 'REHOMING',
//     rehomingId: 2,
//     userId: 1,
//     description: '멍멍이 분양해요',
//     petName: '왕왕',
//     petAge: '2022년 10월 1일',
//     category: '강아지',
//     type: '푸들',
//     gender: '여',
//     region: '서울시 노원구',
//     price: 20000,
//     createdAt: '2023-01-17T16:43:07.603656',
//     updatedAt: '2023-01-17T16:43:07.603656',
//     viewCnt: 1,
//     likeCnt: 0,
//     bookmarkCnt: 1,
//     bookmarked: true,
//     liked: false,
//   },
// ];

export default GoodsTradeTemplate;

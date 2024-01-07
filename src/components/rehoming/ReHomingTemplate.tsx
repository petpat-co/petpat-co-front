import React, { ReactElement, useState } from 'react';
import { useInfiniteQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { rehomingAPI } from 'src/network/api';
import Button from '../shared/element/Button';
import TopSection from '../shared/layout/TopSection';
import * as S from './ReHomingTemplate.style';
import TopRehoming from './TopRehoming';
import AlbumList from '../shared/list/AlbumList';
import Category from './Category';
import { useAppDispatch } from 'src/core/store';
import { getRehomingListApi } from 'src/core/redux/post/rehomingSlice';

const RehomingTemplate = (): ReactElement => {
  const navigate = useNavigate();
  const appdispatch = useAppDispatch();
  const [allValue, setAllValue] = useState<number>(0);
  const [dogCategory, setDogCategory] = useState<number>(0);
  const [category, setCategory] = useState<number>(0);
  const [pageno, setPageNo] = useState<number>(1);

  // const { data, status } = useInfiniteQuery(
  //   ['rehomeList'],
  //   ({ pageParam = 1 }) =>
  //     rehomingAPI.getReHomingList({ params: { page: pageParam } }),
  //   {
  //     getNextPageParam: (lastPage) => {
  //       return lastPage.data.pageno + 1; // 다음 페이지를 호출할 때 사용 될 pageParam
  //     },
  //   },
  // );

  // const { data, status } = useQuery('rehomeList', () =>
  //   rehomingAPI.getReHomingList({ params }),
  // );
  const onClickWrite = () => {
    navigate('/rehome/write');
  };

  React.useEffect(() => {
    appdispatch(getRehomingListApi(pageno));
  }, [])

  return (
    <S.Container>
      {/* ----------헤더영역----------*/}
      <TopSection>
        <S.TitleText>분양글 게시판</S.TitleText>
        <Button
          width="auto"
          border="2px solid #111827"
          _onClick={() => {}}
          _disabled={false}
          activeBg="#fff"
          padding="0 20px"
          radius="120px"
        >
          <S.ButtonSpan onClick={onClickWrite}> 분양 글쓰러가기</S.ButtonSpan>
        </Button>
      </TopSection>
      {/*----------상단 배너(인기글)----------*/}
      <S.WidthWrapper>
        <TopRehoming>
          <div className="top_rehoming_text">
            <p className="top_rehoming_text__title">
              최근에 관심을
              <br />
              많이 받은 분양글
            </p>
            <p className="top_rehoming_text__content">
              귀여운 아이들이
              <br />
              ㅇㅇ님의 관심을 기다리고 있어요!
            </p>
          </div>
          <div className="top_rehoming_list">
            {topPost.map((item, idx) => {
              return <AlbumList key={idx+item.title} item={item} />;
            })}
          </div>
        </TopRehoming>
      </S.WidthWrapper>

      {/* ----------선택된 카테고리----------
      <S.SelectSection>
        <S.LeftBox>
          <S.FirstBox>
            <S.HomeBox>
              <span> 홈 </span>
              <Arrow stroke="#333" strokeWidth="1" width="30" height="30" />
            </S.HomeBox>
            {firstData.map((el, idx) => {
              return (
                <S.SelectWrap key={idx}>
                  <Select
                    data={el.list}
                    value={idx ? category : dogCategory}
                    setValue={idx ? setCategory : setDogCategory}
                  />
                  {idx ? null : (
                    <Arrow
                      stroke="#333"
                      strokeWidth="1"
                      width="30"
                      height="30"
                    />
                  )}
                </S.SelectWrap>
              );
            })}
          </S.FirstBox>
          <S.SecondBox>
            {secendData.map((el, idx) => {
              return (
                <S.CategoryBox key={idx}>
                  <span>{el.text}</span>
                  <Arrow stroke="#333" strokeWidth="1" width="30" height="30" />
                </S.CategoryBox>
              );
            })}
          </S.SecondBox>
        </S.LeftBox>
        <S.RightBox>
          <Select data={mock1} value={allValue} setValue={setAllValue} />
        </S.RightBox>
      </S.SelectSection> */}

      {/* ----------분양글리스트---------- */}
      <S.ListWrapper>
        <S.ListInner>
          <Category />
          <S.ListGrid>
            {postList.map((item, idx) => {
              return <AlbumList key={idx+item.title} item={item} />;
            })}
          </S.ListGrid>
        </S.ListInner>
      </S.ListWrapper>
    </S.Container>
  );
};

export default RehomingTemplate;

const mock1 = ['전체보기', '최신순', '인기순'];
const firstData = [
  {
    list: ['강아지', '고양이', '기타'],
  },
  {
    list: ['강아지 간식 사료', '고양이 간식 츄르', '기타'],
  },
];
const secendData = [
  { text: '전체' },
  { text: '강아지 리빙' },
  { text: '강아지 리빙' },
  { text: '강아지 리빙' },
  { text: '강아지 리빙' },
];

const topPost = [
  {
    rehomingImg: 'https://img.hankyung.com/photo/202308/B20230809112130640.jpg',
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
    rehomingImg:
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
    rehomingImg:
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

const postList = [
  {
    rehomingImg:
      'https://product.cdn.cevaws.com/var/storage/images/media/adaptil-2017/images/www-ww/shutterstock_395310793-3-2/3547034-1-www-WW/shutterstock_395310793-3-2.jpg',
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
    rehomingImg:
      'https://bareunnutri.com/files/attach/images/2022/08/25/27e4b09804f027e9d6f915f8c8d76152.jpg',
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
    rehomingImg: 'https://img.hankyung.com/photo/202308/B20230809112130640.jpg',
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
    rehomingImg:
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
    rehomingImg:
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
  {
    rehomingImg:
      'https://bareunnutri.com/files/attach/images/2022/08/25/27e4b09804f027e9d6f915f8c8d76152.jpg',
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
    rehomingImg:
      'https://bareunnutri.com/files/attach/images/2022/08/25/27e4b09804f027e9d6f915f8c8d76152.jpg',
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
    rehomingImg:
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
  {
    rehomingImg:
      'https://bareunnutri.com/files/attach/images/2022/08/25/27e4b09804f027e9d6f915f8c8d76152.jpg',
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
    rehomingImg:
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
];

// ** Import React
import React, { ReactNode } from 'react';

// ** Import utils
import * as S from './BoardTemplate.style';

// ** Import components
import TitleSection, { TitleSectionPropsType } from '../layout/TitleSection';
import ListCard from '../list/ListCard';
import Category from '../../rehoming/Category';

interface PropsType extends TitleSectionPropsType {
  bannerTitle: ReactNode;
  bannerContent: ReactNode;
}

const BoardTemplate = (props: PropsType) => {
  const { title, buttonText, onClick, bannerTitle, bannerContent } = props;

  return (
    <S.ComponentContainer>
      {/* ----------헤더 영역----------*/}
      <TitleSection title={title} buttonText={buttonText} onClick={onClick} />

      {/*----------상단 배너(인기글) 영역----------*/}
      <S.BestListSection>
        <S.SectionWrapper>
          <S.TextWrapper>
            <S.TitleText>{bannerTitle}</S.TitleText>
            <S.BodyText>{bannerContent}</S.BodyText>
          </S.TextWrapper>
          <S.ListWrapper rowNum={3}>
            {tempBestDataList.map((item, idx) => {
              return (
                <ListCard
                  key={idx + item.title}
                  id={item.rehomingId}
                  imgSource={item.rehomingImg}
                  title={item.title}
                  location={item.location}
                  viewCnt={item.viewCnt}
                  likeCnt={item.likeCnt}
                />
              );
            })}
          </S.ListWrapper>
        </S.SectionWrapper>
      </S.BestListSection>

      {/*----------게시글 리스트 영역----------*/}
      <S.PostListSection>
        <S.SectionWrapper>
          <S.TextWrapper>
            <Category />
          </S.TextWrapper>
          <S.ListWrapper rowNum={4}>
            {tempPostDataList.map((item, idx) => {
              return (
                <ListCard
                  key={idx + item.title}
                  id={item.rehomingId}
                  imgSource={item.rehomingImg}
                  title={item.title}
                  location={item.location}
                  viewCnt={item.viewCnt}
                  likeCnt={item.likeCnt}
                />
              );
            })}
          </S.ListWrapper>
        </S.SectionWrapper>
      </S.PostListSection>
    </S.ComponentContainer>
  );
};

const tempBestDataList = [
  {
    rehomingImg: 'https://img.hankyung.com/photo/202308/B20230809112130640.jpg',
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

const tempPostDataList = [
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

export default BoardTemplate;

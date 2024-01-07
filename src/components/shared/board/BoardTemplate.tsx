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
  bannerData: any[];
  postData: any[];
}

const BoardTemplate = (props: PropsType) => {
  const {
    title,
    buttonText,
    onClick,
    bannerTitle,
    bannerContent,
    bannerData,
    postData,
  } = props;

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
            {bannerData.map((item, idx) => {
              return (
                <ListCard
                  key={idx + item.title}
                  id={item.rehomingId}
                  imgSource={item.rehomingImg}
                  title={item.title}
                  location={item.location}
                  viewCnt={item.viewCnt}
                  likeCnt={item.likeCnt}
                  price={item.price}
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
            {postData.map((item, idx) => {
              return (
                <ListCard
                  key={idx + item.title}
                  id={item.rehomingId}
                  imgSource={item.rehomingImg}
                  title={item.title}
                  location={item.location}
                  viewCnt={item.viewCnt}
                  likeCnt={item.likeCnt}
                  price={item.price}
                />
              );
            })}
          </S.ListWrapper>
        </S.SectionWrapper>
      </S.PostListSection>
    </S.ComponentContainer>
  );
};

export default BoardTemplate;

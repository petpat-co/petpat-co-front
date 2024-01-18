// ** Import React
import React, { ReactNode } from 'react';

// ** Import utils
import * as S from './BoardTemplate.style';

// ** Import components
import TitleSection, { TitleSectionPropsType } from '../layout/TitleSection';
import ListCard from '../list/ListCard';
import Accordion from '../list/Accordion';
import Category from '../../rehoming/Category';

// ** Import types
import { Post } from '../../../types/post';

interface PropsType extends TitleSectionPropsType {
  bannerTitle: ReactNode;
  bannerContent: ReactNode;
  bannerData: any[];
  postListData: Post.BoardList[];
}

const BoardTemplate = (props: PropsType) => {
  const {
    title,
    buttonText,
    onClick,
    bannerTitle,
    bannerContent,
    bannerData,
    postListData,
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
              return <ListCard key={idx + item.title} item={item} />;
            })}
          </S.ListWrapper>
        </S.SectionWrapper>
      </S.BestListSection>

      {/*----------게시글 리스트 영역----------*/}
      <S.PostListSection>
        <S.SectionWrapper>
          <S.TextWrapper>
            <Accordion.Root>
              <Accordion.Item value={'강아지'}>
                <Accordion.Title isMajor={true}>강아지</Accordion.Title>
                <Accordion.Content>
                  <Accordion.Item value={'강아지 사료'}>
                    <Accordion.Title>강아지 사료</Accordion.Title>
                    <ul>
                      <Accordion.Detail>건식 사료(0)</Accordion.Detail>
                      <Accordion.Detail>소프트 사료(100)</Accordion.Detail>
                      <Accordion.Detail>습식 사료(11)</Accordion.Detail>
                      <Accordion.Detail>건조/생식 사료(33)</Accordion.Detail>
                      <Accordion.Detail>분유(33)</Accordion.Detail>
                      <Accordion.Detail>기능성 사료(34)</Accordion.Detail>
                    </ul>
                  </Accordion.Item>
                  <Accordion.Item value={'강아지 간식'}>
                    <Accordion.Title>강아지 간식</Accordion.Title>
                    <ul>
                      <Accordion.Detail>건식 사료(0)</Accordion.Detail>
                      <Accordion.Detail>소프트 사료(100)</Accordion.Detail>
                      <Accordion.Detail>습식 사료(11)</Accordion.Detail>
                      <Accordion.Detail>건조/생식 사료(33)</Accordion.Detail>
                      <Accordion.Detail>분유(33)</Accordion.Detail>
                      <Accordion.Detail>기능성 사료(34)</Accordion.Detail>
                    </ul>
                  </Accordion.Item>
                  <Accordion.Item value={'강아지 영양제'}>
                    <Accordion.Title>강아지 영양제</Accordion.Title>
                    <ul>
                      <Accordion.Detail>건식 사료(0)</Accordion.Detail>
                      <Accordion.Detail>소프트 사료(100)</Accordion.Detail>
                      <Accordion.Detail>습식 사료(11)</Accordion.Detail>
                      <Accordion.Detail>건조/생식 사료(33)</Accordion.Detail>
                      <Accordion.Detail>분유(33)</Accordion.Detail>
                      <Accordion.Detail>기능성 사료(34)</Accordion.Detail>
                    </ul>
                  </Accordion.Item>
                  <Accordion.Item value={'강아지 용품'}>
                    <Accordion.Title>강아지 용품</Accordion.Title>
                    <ul>
                      <Accordion.Detail>건식 사료(0)</Accordion.Detail>
                      <Accordion.Detail>소프트 사료(100)</Accordion.Detail>
                      <Accordion.Detail>습식 사료(11)</Accordion.Detail>
                      <Accordion.Detail>건조/생식 사료(33)</Accordion.Detail>
                      <Accordion.Detail>분유(33)</Accordion.Detail>
                      <Accordion.Detail>기능성 사료(34)</Accordion.Detail>
                    </ul>
                  </Accordion.Item>
                </Accordion.Content>
              </Accordion.Item>
            </Accordion.Root>
            {/*<Category />*/}
          </S.TextWrapper>
          <S.ListWrapper rowNum={4}>
            {postListData.map((item, idx) => {
              return <ListCard key={idx + item.title} item={item} />;
            })}
          </S.ListWrapper>
        </S.SectionWrapper>
      </S.PostListSection>
    </S.ComponentContainer>
  );
};

export default BoardTemplate;

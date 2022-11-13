import React from 'react';
import BannerSection from '../shared/layout/BannerSection';
import Tag from '../shared/Tag';
import * as S from './QnaTemplate.styled';

const QnaTemplate = () => {
  const mockTag = ['강아지', '고양이', '물고기', '동물병원'];

  return (
    <>
      <BannerSection>
        <S.TitleText>질문 게시판</S.TitleText>
        <S.SubText>반려동물과 관련된 모든 질문 적으셈</S.SubText>
        <S.SearchInput placeholder="검색어를 입력해주세요." />
        <S.TagContainer>
          # 인기태그:{' '}
          {mockTag.map((tag, idx) => (
            <Tag key={idx}>{tag} </Tag>
          ))}
        </S.TagContainer>
      </BannerSection>
    </>
  );
};

export default QnaTemplate;

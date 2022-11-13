import React from 'react';
import BannerSection from '../shared/layout/BannerSection';
import Select from '../shared/Select';
import Tag from '../shared/Tag';
import * as S from './QnaTemplate.styled';

const QnaTemplate = () => {
  const mockTag = ['강아지', '고양이', '물고기', '동물병원'];
  const mockSelect = ['최신순', '좋아요순', '댓글순'];

  const [value, setValue] = React.useState<number>(-1);
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
      <Select
        data={mockSelect}
        value={value}
        setValue={setValue}
        placeholder="dsa"
      />
    </>
  );
};

export default QnaTemplate;

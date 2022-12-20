import { format } from 'date-fns';
import React from 'react';

import BannerSection from '../shared/layout/BannerSection';
import Select from '../shared/select/Select';
import Tag from '../shared/Tag';
import { ReactComponent as View } from '../../asset/viewIcon.svg';
import { ReactComponent as Comment } from '../../asset/commentIcon.svg';

import * as S from './QnaTemplate.styled';

const QnaTemplate = () => {
  const mockTag = ['강아지', '고양이', '물고기', '동물병원'];
  const mockSelect = ['최신순', '좋아요순', '댓글순'];
  const mockQnA = [
    {
      qnaImg: ' ',
      postId: 5,
      postType: 'qna',
      title: '자꾸 다른 강아지를 보면 짖어요ㅠ',
      username: '오애렁',
      descrption:
        '한 달 전부터 산책을 나가면 자꾸 다른 강아지를 보고 짖어서 매번 마음편히 산책을 나갈 수가 없어요,, 왜 그러는 걸까요? 도움 부탁드려요ㅠ',
      createdAt: '2022-09-31T12:00:00',
      updatedAt: '2022-09-31T12:00:00',
      isBookmark: true,
      isCompleted: false,
      viewCount: 10,
      bookMarkCount: 3,
      tag: ['강아지', '고양이', '물고기', '동물병원'],
      commentCount: 10,
    },
  ];

  const [value, setValue] = React.useState<number>(0);
  return (
    <>
      <BannerSection>
        <S.TitleText>질문 게시판</S.TitleText>
        <S.SubText>반려동물과 관련된 모든 질문 적으셈</S.SubText>
        <S.SearchInput placeholder="검색어를 입력해주세요." />
        <S.TagContainer>
          <span># 인기태그:</span>
          {mockTag.map((tag, idx) => (
            <Tag key={idx}>{tag} </Tag>
          ))}
        </S.TagContainer>
      </BannerSection>
      <S.QnAContainer>
        <S.QnAToolWrap>
          <Select data={mockSelect} value={value} setValue={setValue} />
        </S.QnAToolWrap>
        <S.QnAWrap>
          {mockQnA.map((item) => (
            <S.QnAItem key={item.postId}>
              <div>
                <div>{item.username}</div>
                {format(new Date(item.createdAt), 'yy.MM.dd')}
              </div>
              <h1>{item.title}</h1>
              <h3>{item.descrption}</h3>
              <div>
                <div>
                  {item.tag.map((tag, idx) => (
                    <Tag key={idx}>{tag}</Tag>
                  ))}
                </div>
                <S.IconBox>
                  <View />
                  {item.viewCount}
                  <Comment />
                  {item.commentCount}
                </S.IconBox>
              </div>
            </S.QnAItem>
          ))}
        </S.QnAWrap>
      </S.QnAContainer>
    </>
  );
};

export default QnaTemplate;

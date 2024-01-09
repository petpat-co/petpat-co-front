// ** Import React
import React from 'react';
import { useNavigate } from 'react-router-dom';

// ** Import components
import { Button } from 'src/components/shared/element';

// ** Import lib
import styled from 'styled-components';

// ** Import svg
import { ReactComponent as Success } from '../../../asset/modalicon/success.svg';
import { ReactComponent as Fail } from '../../../asset/modalicon/sadface.svg';

// ** Import utils
import theme from '../../../styles/theme';

type WriteResultViewProps = {
  page: string;
  isSuccess: boolean;
};

const WriteResultView = ({ page, isSuccess }: WriteResultViewProps) => {
  const navigate = useNavigate();
  const nickname = JSON.parse(localStorage.getItem('userInfo')!).nickname;

  const goToList = () => {
    if (!isSuccess) {
      return;
    }
    navigate(`/${page}`, { replace: true });
  };

  let pageName = '';
  switch (page) {
    case 'trade':
      pageName = '물품 판매';
      break;
    case 'rehome':
      pageName = '분양';
      break;
    case 'qna':
      pageName = '질문';
      break;
  }

  const title = isSuccess
    ? '성공적으로 글이 게시되었어요!'
    : '게시글 등록에 실패했습니다.';
  const content = isSuccess
    ? `${nickname}님의 ${pageName} 글쓰기가 \n 성공적으로 게시되었어요!`
    : '다시 시도해주세요.';
  const icon = isSuccess ? <Success /> : <Fail />;

  return (
    <>
      <CircleIconSection>{icon}</CircleIconSection>
      <TextSection>
        <TitleText>{title}</TitleText>
        <ContentText>{content}</ContentText>
      </TextSection>
      <BtnContainer>
        <Button
          padding={'0 24px'}
          activeColor={`${theme.colors.white}`}
          radius="20px"
          isFlex={true}
          activeBg={`${theme.colors.primary}`}
          _onClick={goToList}
        >
          확인했어요
        </Button>
      </BtnContainer>
    </>
  );
};

const CircleIconSection = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1;
  margin: auto;
  left: 50%;
  transform: translateX(-50%);
  top: 140px;
  width: 150px;
  height: 150px;
  border-radius: 80px;
  background-color: ${theme.colors.white};
`;

const TitleText = styled.p`
  font-size: ${theme.fontSizes.titleSize};
  font-weight: ${theme.fontWeights.lbold};
  color: ${({ theme }) => theme.colors.primary};
`;

const ContentText = styled.p`
  font-size: ${theme.fontSizes.xlg};
  color: ${theme.colors.coolgray400};
  white-space: pre-line;
`;

const TextSection = styled.div`
  width: 100%;
  display: grid;
  gap: 16px;
  text-align: center;
`;

const BtnContainer = styled.div`
  width: fit-content;
  margin: 56px auto 0 auto;
`;

export default WriteResultView;

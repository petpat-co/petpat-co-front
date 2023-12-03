import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Button, DisplayGrid } from 'src/components/shared/element';
import styled from 'styled-components';
import { ReactComponent as Success } from '../../../asset/modalicon/success.svg';
import { ReactComponent as Fail } from '../../../asset/modalicon/sadface.svg';

const WriteSuccess = () => {
  const isSuccess = useSelector((state: any) => state.qna.isSuccess);
  const navigate = useNavigate();

  const goToList = () => {
    if(isSuccess==='false') {
      return;
    }
    navigate('/qna', { replace: true });
  };

  return (
    <Container>
      <PrimaryBanner />
      <Circle>{isSuccess === true ? <Success /> : <Fail />}</Circle>
      <TextWrapper>
        {isSuccess === true ? (
          <>
            <Title>성공적으로 글이 게시되었어요!</Title>
            <Content>
              ㅇㅇ님의 질문 글쓰기가
              <br />
              성공적으로 게시되었어요!
            </Content>
          </>
        ) : (
          <>
            <Title>게시글 등록에 실패했습니다.</Title>
            <Content>다시 시도해주세요.</Content>
          </>
        )}
      </TextWrapper>
      <div style={{ width: 'fit-content', margin: '56px auto 0 auto' }}>
        <Button
          width="124px"
          height="42px"
          colors="white"
          radius="20px"
          bgcolor="primary"
          _onClick={goToList}
        >
          확인했어요
        </Button>
      </div>
    </Container>
  );
};

const Container = styled.div`
  position: relative;
  width: 640px;
  height: 584px;
  border-radius: 30px;
  background-color: #fff;
`;

const PrimaryBanner = styled.div`
  width: 100%;
  height: 216px;
  background-color: ${({ theme }) => theme.colors.primary};
  border-radius: 30px 30px 0 0;
`;

const Circle = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  margin: auto;
  left: 245px;
  top: 141px;
  width: 150px;
  height: 150px;
  border-radius: 80px;
  background-color: #fff;
`;

const Title = styled.p`
  font-size: 24px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.primary};
`;

const Content = styled.p`
  font-size: 18px;
  color: #858585;
`;

const TextWrapper = styled.div`
  width: 100%;
  display: grid;
  gap: 16px;
  margin: 99px auto 0 auto;
  text-align: center;
`;

export default WriteSuccess;

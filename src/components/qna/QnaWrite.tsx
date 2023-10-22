import React from 'react';
import styled from 'styled-components';
import { Input } from '../shared/element';

const QnaWrite = (): React.ReactElement => {
  const imageArr = ['', '', '', ''];
  const [mainImage, setMainImage] = React.useState(0);
  const [file, setFile] = React.useState(['']);

  const onClickImageBox = (idx: number) => {
    setMainImage(idx);
  };

  const titleHandler = (value: string) => {
    return;
  };

  return (
    <Container>
      <TitleBanner>질문 게시판 글쓰기</TitleBanner>
      <FormContainer>
        <p>제목</p>
        <Input
          borderRadius="28px"
          placeholder="제목을 입력해 주세요"
          onChange={(e) => {
            titleHandler(e.target.value);
          }}
          maxLength={200}
          name="qnaTitle"
        />
        <p>질문 내용</p>
        <TextArea placeholder="중성화 여부 O / 1차 접종 X … " />
        <p>
          이미지 <span>(0/5)</span>
        </p>
        <ImageContainer>
          <UploadImage>
            <div
              style={{
                width: '65px',
                height: '65px',
                backgroundColor: '#fff',
                borderRadius: '36px',
                border: '2px solid red',
                position: 'relative',
                margin: '90px auto',
              }}
            >
              <p
                style={{
                  fontSize: '80px',
                  fontWeight: '100',
                  position: 'absolute',
                  top: '-24px',
                  left: '7px',
                  color: 'red',
                }}
              >
                +
              </p>
            </div>
          </UploadImage>
          {imageArr.map((item, idx) => {
            if (mainImage === idx) {
              return (
                <ImageBox
                  key={idx}
                  onClick={() => {
                    onClickImageBox(idx);
                  }}
                  checked={true}
                />
              );
            } else {
              return (
                <ImageBox
                  key={idx}
                  onClick={() => {
                    onClickImageBox(idx);
                  }}
                  checked={false}
                />
              );
            }
          })}
        </ImageContainer>
        <WarnMessage>
          <p>
            * 부적절한 이미지를 등록할 경우 서비스 이용에 제한 및 어려움이 있을
            수 있습니다.
          </p>
          <p>- 사진은 최대 1MB까지 업로드 가능합니다.</p>
          <p>- 문제가 발생할 경우 관리자에게 문의해주세요.</p>
        </WarnMessage>
      </FormContainer>
    </Container>
  );
};

const Container = styled.div`
  padding-top: 278px;
  width: 100%;
`;

const TitleBanner = styled.div`
  padding: 0 180px;
  width: 100%;
  height: 128px;
  background-color: ${({ theme }) => theme.colors.primary};
  display: flex;
  align-items: center;
  font-size: 40px;
  font-weight: 700;
  color: #fff;
`;

const FormContainer = styled.div`
  padding: 80px 100px;
  & > input {
    border: ${({ theme }) => `1px solid ${theme.colors.primary}`};
  }
`;

const TextArea = styled.textarea`
  outline: none;
  padding: 32px;
  border: ${({ theme }) => `1px solid ${theme.colors.primary}`};
  border-radius: 28px;
  width: 100%;
  height: 320px;
`;

const ImageContainer = styled.div`
  display: flex;
  gap: 20px;
`;

const ImageBox = styled.div<{ checked: any }>`
  width: 260px;
  height: 260px;
  background-color: ${({ theme }) => theme.colors.sub03};
  border-radius: 28px;
  cursor: pointer;
  border: ${(props) => (props.checked === true ? ' 4px solid red' : 'none')};
`;

const UploadImage = styled.div`
  width: 260px;
  height: 260px;
  background-color: ${({ theme }) => theme.colors.sub03};
  border: ${({ theme }) => `4px dashed ${theme.colors.primary}`};
  border-radius: 28px;
  cursor: pointer;
`;

const WarnMessage = styled.div``;

export default QnaWrite;

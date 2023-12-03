import React, { ReactElement } from 'react';
import styled from 'styled-components';
import { ReactComponent as ViewCount } from '../../asset/postIcon/viewcount.svg';
import { ReactComponent as ChatBubble } from '../../asset/postIcon/chatbubble.svg';
import { format } from 'date-fns';
import { useNavigate } from 'react-router-dom';

interface PropsType {
  title: string;
  imagePath?: string;
  nickname: string;
  createdAt: string;
  viewCnt: number | string;
  qnaId: number | string;
  commentCnt?: number | string;
  // content: string;
}

const QnaItem = (props: PropsType): ReactElement => {
  const { qnaId, title, nickname, createdAt, viewCnt, imagePath, commentCnt } =
    props;

  const navigate = useNavigate();
  const date = new Date(createdAt);
  console.log(createdAt);

  const onClickHandler = (postId: number | string) => {
    navigate(`/qna/detail/${postId}`);
  };

  return (
    <React.Fragment>
      <Container
        key={qnaId}
        onClick={() => {
          onClickHandler(qnaId);
        }}
      >
        <TitleContainer>
          <p className="qna_title">{title}</p>
          <p className="qna_createAt">{format(date, 'yy.MM.dd')}</p>
        </TitleContainer>
        <ContentContainer>
          <div className="qna_content">{/* <p>{content}</p> */}</div>
          <Image src={imagePath} />
        </ContentContainer>
        <InfoContainer>
          <p>{nickname}</p>
          <div>
            <ViewCount stroke="#6B7280" />
            <p>{viewCnt}</p>
            <ChatBubble fill="#6B7280" />
            <p>{commentCnt ? commentCnt : 0}</p>
          </div>
        </InfoContainer>
      </Container>
    </React.Fragment>
  );
};

export const Container = styled.div`
  position: relative;
  width: 100%;
  min-width: 600px;
  height: 252px;
  background-color: ${({ theme }) => theme.colors.coolgray50};
  border: ${({ theme }) => `1px solid ${theme.colors.coolgray900}`};
  border-radius: 10px;
  margin: 20px 0;
  cursor: poiner;
  transition: 0.15s ease-in-out;
  &:hover {
    border: ${({ theme }) => `1px solid ${theme.colors.primary}`};
  }
`;

export const TitleContainer = styled.div`
  padding: 32px 40px;
  width: 100%;
  height: 88px;
  border-bottom: ${({ theme }) => `1px solid ${theme.colors.coolgray900}`};
  & > .qna_title {
    float: left;
    margin-top: -4px;
    font-size: ${({ theme }) => theme.fontSizes.xlarge};
  }

  & > .qna_createAt {
    float: right;
    font-size: ${({ theme }) => theme.fontSizes.regular};
    color: ${({ theme }) => theme.colors.coolgray500};
  }
`;

export const ContentContainer = styled.div`
  padding: 24px 40px;
  display: flex;
  & > .qna_content {
    padding: 0 40px 0 0;
    width: 100%;
    height: 60px;
    color: ${({ theme }) => theme.colors.coolgray400};
  }
`;

export const InfoContainer = styled.div`
  position: absolute;
  left: 40px;
  bottom: 24px;
  height: fit-content;
  display: flex;
  align-items: center;
  color: #6b7280;
  & > div {
    margin: 0 40px;
    display: flex;
    align-items: center;
  }
  & > div > p {
    margin: 0 10px 0 2px;
  }
`;

export const Image = styled.div<{ src: string | null | undefined }>`
  width: 116px;
  height: 116px;
  border-radius: 10px;
  background-color: #ddd;
  background-image: ${({ src }) => `url(${src})`};
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
`;

export default QnaItem;

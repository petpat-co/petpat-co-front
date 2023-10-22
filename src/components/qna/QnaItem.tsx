import React, { ReactElement } from 'react';
import styled from 'styled-components';
import { ReactComponent as ViewCount } from '../../asset/postIcon/viewcount.svg';
import { ReactComponent as ChatBubble } from '../../asset/postIcon/chatbubble.svg';
import { format } from 'date-fns';
import { useNavigate } from 'react-router-dom';

interface PropsType {
  title: string;
  content: string;
  img?: string;
  username: string;
  createdAt: string;
  viewCnt: number | string;
  commentCnt: number | string;
  postId: number | string;
}

const QnaItem = (props: PropsType): ReactElement => {
  const {
    postId,
    title,
    content,
    username,
    createdAt,
    viewCnt,
    commentCnt,
  } = props;
  
  const navigate = useNavigate();
  const date = new Date(createdAt);

  const onClickHandler = (postId: number | string) => {
    navigate(`/qna/detail/${postId}`);
  };


  return (
    <React.Fragment>
      <Container
        key={postId}
        onClick={() => {
          onClickHandler(postId);
        }}
      >
        <TitleContainer>
          <p className="qna_title">{title}</p>
          <p className="qna_createAt">{format(date, 'yy.MM.dd')}</p>
        </TitleContainer>
        <ContentContainer>
          <div className="qna_content">
            <p>{content}</p>
          </div>
          <Image />
        </ContentContainer>
        <InfoContainer>
          <p>{username}</p>
          <div>
            <ViewCount stroke="#6B7280"/>
            <p>{viewCnt}</p>
            <ChatBubble fill="#6B7280"/>
            <p>{commentCnt}</p>
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
    border: ${({theme}) => `1px solid ${theme.colors.primary}`};
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
  color: #6B7280;
  & > div {
    margin: 0 40px;
    display: flex;
    align-items: center;
  }
  & > div > p {
    margin: 0 10px 0 2px;
  }
`;

export const Image = styled.div`
  width: 116px;
  height: 116px;
  border-radius: 10px;
  background-color: #ddd;
`;

export default QnaItem;

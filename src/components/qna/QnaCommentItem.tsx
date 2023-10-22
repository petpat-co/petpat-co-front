import React from 'react';
import styled from 'styled-components';

interface PropsType {
  userImgUrl?: string;
  username?: string;
  commentContent?: string;
  createdAt?: string;
  updatedAt?: string;
}

const QnaCommentItem = (props: PropsType) => {
  const {
    username,
    userImgUrl,
    commentContent,
    createdAt,
  } = props;

  return (
    <Container>
      <Profile src={userImgUrl}>
        <div className="profile_image" />
        <p className="profile_username">{username}</p>
      </Profile>
      <Content>{commentContent}</Content>
      <DateLine>
      {createdAt}
      <p>답글쓰기</p>
      </DateLine>
    </Container>
  );
};

const Container = styled.div`
  padding: 32px 0;
  width: 100%;
  border-bottom: ${({theme}) => `1px solid ${theme.colors.coolgray300}`};
`;

const Profile = styled.div<{ src?: string }>`
  display: flex;
  align-items: center;
  gap: 16px;

  & > .profile_image {
    width: 60px;
    height: 60px;

    background-image: ${({ src }) => `url(${src})`};
    background-repeat: no-repeat;
    background-size: cover;
    background-position:center;

    border-radius: 30px;
  }

  & > .profile_username {
    width: fit-content;
    font-weight: 700;
    font-size: 24px;
  }
`;

const Content = styled.div`
  margin: 32px 0;
`;

const DateLine = styled.div`
  display: flex;
  gap: 16px;
  color: ${({theme}) => theme.colors.coolgray500};
  & > p {
    font-weight: 700;
    cursor: pointer;
    color: ${({theme}) => theme.colors.default};
  }
`

export default QnaCommentItem;

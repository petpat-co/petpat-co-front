import React from 'react';
import styled from 'styled-components';
import { ReactComponent as HeartIcon } from '../../../asset/heart.svg';
import { ReactComponent as ViewIcon } from '../../../asset/postIcon/viewcount.svg';
import { useNavigate } from 'react-router-dom';

interface POST {
  item: {
    postId?: number | string;
    imagePath?: string;
    region?: string;
    createdAt?: string;
    likeCnt?: number | string;
    liked?: boolean;
    bookmarkCnt?: number | string;
    bookmarked?: boolean;
    postType?: string;
    status?: string;
    title?: string;
    updatedAt?: string;
    viewCnt?: number | string;

    userId?: number | string;
    nickname?: string;
    description?: string;
    petName?: string;
    petAge?: string;
    category?: string;
    type?: string;
    gender?: string;
    location?: string;
    price?: number | string;
  };
}

const AlbumList = (props: POST) => {
  const navigate = useNavigate();
  const { item } = props;

  const goToDetail = () => {
    navigate(`/rehome/detail/${item.postId}`);
  };

  return (
    <Container>
      <Image src={item.imagePath} onClick={goToDetail} />
      <AdressAndCnt>
        <Adress>{item.region}</Adress>
        <Count>
          <Heart>
            <HeartIcon fill="#d9d9d9" width="18px" height="18px" />
            {item.likeCnt}
          </Heart>
          <View>
            <ViewIcon stroke="#d9d9d9" width="27px" height="27px" />
            {item.viewCnt}
          </View>
        </Count>
      </AdressAndCnt>
      <Title onClick={goToDetail}>
        {item.title && item.title.length > 18
          ? item.title.substring(0, 17) + '...'
          : item.title}
      </Title>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  font-weight: 500;
`;

const Image = styled.div<{ src: string | undefined }>`
  width: 100%;
  padding-bottom: 100%;
  border: ${({ theme }) => `1px solid ${theme.colors.coolgray900}`};
  border-radius: 30px;
  background-image: ${({ src }) => `url(${src})`};
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  cursor: pointer;
`;

const AdressAndCnt = styled.div`
  margin: 16px 0 10px 0;

  display: flex;
  justify-content: space-between;
  align-items: center;

  font-size: 14px;
  color: ${({ theme }) => theme.colors.coolgray400};
  font-weight: 500;
  padding: 0 2px;
`;

const Adress = styled.p`
  width: fit-content;
`;

const Title = styled.p`
  padding: 0 2px;
  font-size: 16px;
  cursor: pointer;
`;

const Count = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  color: #d9d9d9;
`;
const Heart = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`;
const View = styled.div`
  display: flex;
  align-items: center;
  gap: 2px;
`;

export default AlbumList;

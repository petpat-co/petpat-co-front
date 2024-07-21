// ** Import React
import React, { useEffect, useState } from 'react';
import { useAppDispatch } from '../../../core/store';
import { useNavigate } from 'react-router-dom';

// ** Import lib
import styled from 'styled-components';

// ** Import utils
import theme from '../../../styles/theme';

// ** Import svg
import { ReactComponent as ViewIcon } from '../../../asset/postIcon/viewcount.svg';
import Heart from '../../../asset/postIcon/Heart';

// ** Import types
import { Post } from '../../../types/post';

// ** Import api
import { likeApi } from 'src/core/redux/post/postSlice';

interface ListCardProps {
  item: Post.InfoState;
  postType: string;
}

const ListCard = ({ item, postType }: ListCardProps) => {
  const { postId, imagePath, region, liked, viewCnt, title, price, status } =
    item;

  const appDispatch = useAppDispatch();
  const navigate = useNavigate();

  const [isLiked, setIsLiked] = useState<boolean>(liked);

  // props 데이터 변경 감지 > 상태 업데이트
  useEffect(() => {
    if (isLiked === liked) return;

    setIsLiked(liked);
  }, [liked]);

  const addComma = (price: number) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };

  const handleMovePage = (postId: number) => {
    // navigate(`/rehome/detail/${postId}`);
    navigate(`/${postType}/detail/${postId}`);
  };

  return (
    <ComponentContainer>
      <ImageContainer>
        <ImageSection src={imagePath} onClick={() => handleMovePage(postId)} />
        {!status.includes('FINDING') && (
          <StatusSection>
            {status.includes('RESERVING') ? '예약중' : '판매완료'}
          </StatusSection>
        )}
      </ImageContainer>
      <InformationSection>
        <AddressText>{region}</AddressText>
        <IconContainer>
          <HeartIconWrapper
            onClick={() => {
              setIsLiked(!isLiked);
              appDispatch(likeApi({ postType, postId }));
            }}
          >
            {isLiked ? (
              <Heart width="18px" height="18px" fill="#F35F4C" />
            ) : (
              <Heart width="18px" height="18px" />
            )}
          </HeartIconWrapper>
          <ViewIconWrapper>
            <ViewIcon
              stroke={`${theme.colors.coolgray400}`}
              width="27px"
              height="27px"
            />
            {viewCnt}
          </ViewIconWrapper>
        </IconContainer>
      </InformationSection>
      <TitleText onClick={() => handleMovePage(postId)}>{title}</TitleText>
      {price && <PriceText>{addComma(price)}원</PriceText>}
    </ComponentContainer>
  );
};

const ComponentContainer = styled.div`
  font-weight: ${theme.fontWeights.regular};
  min-width: 0; // 말줄임표 사용 속성 적용 시 필요
`;

const ImageContainer = styled.div`
  position: relative;
`;

const BorderBoxStyle = styled.div`
  border: ${({ theme }) => `1px solid ${theme.colors.coolgray900}`};
`;

const ImageSection = styled(BorderBoxStyle)<{ src: string | undefined }>`
  aspect-ratio: 1;
  border-radius: 24px;
  background-image: ${({ src }) => `url(${src})`};
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  cursor: pointer;
`;

const StatusSection = styled(BorderBoxStyle)`
  position: absolute;
  width: 100%;
  bottom: 0;
  padding: 12px 0;
  background-color: ${theme.colors.coolgray200};
  border-bottom-left-radius: 24px;
  border-bottom-right-radius: 24px;

  text-align: center;
  font-size: ${theme.fontSizes.small};
  color: ${theme.colors.coolgray500};
`;

const InformationSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: ${theme.fontSizes.small};
  font-weight: ${theme.fontWeights.regular};
  color: ${({ theme }) => theme.colors.coolgray400};
  padding: 0 4% 0 1%;
  margin-top: 4%; // image와 간격 설정
`;

const AddressText = styled.p`
  width: fit-content;
`;

const IconContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
`;

const IconWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const HeartIconWrapper = styled.button`
  gap: 4px;
  display: flex;
  align-items: center;
  cursor: pointer;
`;

const ViewIconWrapper = styled(IconWrapper)`
  gap: 2px;
`;

const TitleText = styled.p`
  padding: 0 2px;
  font-size: ${theme.fontSizes.regular};
  margin-top: 2%; // address와 간격 설정
  cursor: pointer;

  // 말줄임표 속성 적용
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
`;

const PriceText = styled.p`
  padding: 0 2px;
  font-size: ${theme.fontSizes.xlg};
  margin-top: 3%; // title과 간격 설정
`;

export default ListCard;

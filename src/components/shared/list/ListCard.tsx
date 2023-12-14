// ** Import React
import React from 'react';

// ** Import lib
import styled from 'styled-components';

// ** Import utils
import theme from '../../../styles/theme';

// ** Import svg
import { ReactComponent as HeartIcon } from '../../../asset/heart.svg';
import { ReactComponent as ViewIcon } from '../../../asset/postIcon/viewcount.svg';

interface ListCardProps {
  id: number;
  imgSource?: string | undefined;
  location: string;
  likeCnt: number;
  viewCnt: number;
  title: string;
  price?: number;
}

const ListCard = (props: ListCardProps) => {
  const { id, imgSource, location, likeCnt, viewCnt, title, price } = props;

  const addComma = (price: number) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };

  return (
    <ComponentContainer
      onClick={() => {
        console.log('상세 페이지 이동');
      }}
    >
      <ImageSection src={imgSource} />
      <InformationSection>
        <AddressText>{location}</AddressText>
        <IconContainer>
          <HeartIconWrapper>
            <HeartIcon
              fill={`${theme.colors.coolgray400}`}
              width="18px"
              height="18px"
            />
            {likeCnt}
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
      <TitleText>{title}</TitleText>
      {price && <PriceText>{addComma(price)}원</PriceText>}
    </ComponentContainer>
  );
};

const ComponentContainer = styled.div`
  font-weight: ${theme.fontWeights.regular};
  cursor: pointer;
  min-width: 0; // 말줄임표 사용 속성 적용 시 필요
`;

const ImageSection = styled.div<{ src: string | undefined }>`
  aspect-ratio: 1;
  border: ${({ theme }) => `1px solid ${theme.colors.coolgray900}`};
  border-radius: 30px;
  background-image: ${({ src }) => `url(${src})`};
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
`;

const InformationSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: ${theme.fontSizes.small};
  font-weight: ${theme.fontWeights.regular};
  color: ${({ theme }) => theme.colors.coolgray400};
  padding: 0 4% 0 1%;
  margin-top: 2%; // image와 간격 설정
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

const HeartIconWrapper = styled(IconWrapper)`
  gap: 4px;
`;

const ViewIconWrapper = styled(IconWrapper)`
  gap: 2px;
`;

const TitleText = styled.p`
  padding: 0 2px;
  font-size: ${theme.fontSizes.regular};
  margin-top: 1%; // address와 간격 설정

  // 말줄임표 속성 적용
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
`;

const PriceText = styled.p`
  padding: 0 2px;
  font-size: ${theme.fontSizes.xlg};
  margin-top: 2%; // title과 간격 설정
`;

export default ListCard;

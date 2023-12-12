// ** Import React
import React from 'react';

// ** Import lib
import styled from 'styled-components';

// ** Import utils
import theme from '../../../styles/theme';

// ** Import components
import { ReactComponent as HeartIcon } from '../../../asset/heart.svg';
import { ReactComponent as ViewIcon } from '../../../asset/postIcon/viewcount.svg';

interface ListCardProps {
  id: number;
  imgSource?: string | undefined;
  location: string;
  likeCnt: number;
  viewCnt: number;
  title: string;
}

const ListCard = (props: ListCardProps) => {
  const { id, imgSource, location, likeCnt, viewCnt, title } = props;
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
    </ComponentContainer>
  );
};

const ComponentContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  font-weight: ${theme.fontWeights.regular};
  cursor: pointer;
  background-color: ${theme.colors.blueTitle};
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
  background-color: ${theme.colors.gray40};
`;

const InformationSection = styled.div`
  margin: 16px 0 10px 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: ${theme.fontSizes.small};
  font-weight: ${theme.fontWeights.regular};
  color: ${({ theme }) => theme.colors.coolgray400};
  padding: 0 2px;
  background-color: ${theme.colors.gray40};
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
  background-color: ${theme.colors.primary};

  // 말줄임표 속성 적용
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
`;

export default ListCard;

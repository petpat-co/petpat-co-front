// ** Import React
import React from 'react';

// ** Import lib
import styled from 'styled-components';

// ** Import utils
import theme from '../../../styles/theme';

// ** Import components
import Button from '../element/Button';

export interface TitleSectionPropsType {
  title: string;
  buttonText?: string;
  onClick?: (e: React.MouseEvent) => void;
}

const TitleSection = ({
  title,
  buttonText,
  onClick,
}: TitleSectionPropsType) => {
  return (
    <Container>
      <Wrap>
        <TitleText>{title}</TitleText>
        {buttonText && onClick ? (
          <Button
            width={'auto'}
            border={`2px solid ${theme.colors.coolgray900}`}
            _onClick={onClick}
            activeBg={theme.colors.white}
            padding={'0 20px'}
            radius={'120px'}
          >
            <ButtonSpan>{buttonText}</ButtonSpan>
          </Button>
        ) : null}
      </Wrap>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  height: 126px;
  background: ${({ theme }) => theme.colors.primary};
`;

const Wrap = styled.div`
  margin: 128px auto 0 auto;
  width: 100%;
  max-width: 1440px;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;

  // @media ${({ theme }) => theme.device.web} {
  //   width: 100%;
  // }
`;

const TitleText = styled.h2`
  font-weight: ${theme.fontWeights.lbold};
  font-size: ${theme.fontSizes.xxlarge};
  color: ${theme.colors.white};
`;

const ButtonSpan = styled.span`
  font-weight: ${theme.fontWeights.regular};
  font-size: ${theme.fontSizes.xlg};
  color: ${theme.colors.coolgray900};
`;

export default TitleSection;

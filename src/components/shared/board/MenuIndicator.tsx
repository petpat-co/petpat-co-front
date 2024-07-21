// ** Import React
import React from 'react';

// ** Import utils
import theme from '../../../styles/theme';

// ** Import svg
import { ReactComponent as Arrow } from '../../../asset/arrowIcon.svg';

// ** Import lib
import styled from 'styled-components';

type MenuIndicatorProps = {
  menuList: any[];
};

const MenuIndicator = ({ menuList }: MenuIndicatorProps) => {
  return (
    <ComponentContainer>
      {menuList.length === 0 ? (
        <MenuText>전체</MenuText>
      ) : (
        <>
          {menuList.map((data: any, idx: number) => (
            <ContentWrapper key={idx}>
              <MenuText>{data.name}</MenuText>
              {menuList.length - 1 > idx && (
                <Arrow
                  width={16}
                  height={16}
                  strokeWidth="1.75"
                  stroke={`${theme.colors.coolgray500}`}
                />
              )}
            </ContentWrapper>
          ))}
        </>
      )}
    </ComponentContainer>
  );
};

const ComponentContainer = styled.div`
  display: flex;
  align-items: center;
  position: absolute;
  top: -40px;
`;

const ContentWrapper = styled.div`
  display: flex;
`;

const MenuText = styled.p`
  font-size: ${theme.fontSizes.xsmall};
  color: ${theme.colors.coolgray500};
  padding: 0 8px;
`;

export default MenuIndicator;

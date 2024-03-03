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
      {menuList.map((data: any, idx: number) => (
        <>
          <MenuText key={idx}>{data.name}</MenuText>
          {menuList.length - 1 > idx && (
            <Arrow
              width={16}
              height={16}
              strokeWidth="1.75"
              stroke={`${theme.colors.coolgray500}`}
            />
          )}
        </>
      ))}
    </ComponentContainer>
  );
};

const ComponentContainer = styled.div`
  display: flex;
  align-items: center;
  position: absolute;
  top: -40px;
  gap: 10px;
  padding-left: 6px;
`;

const MenuText = styled.p`
  font-size: ${theme.fontSizes.xsmall};
  color: ${theme.colors.coolgray500};
`;

export default MenuIndicator;

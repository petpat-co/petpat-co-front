import styled from 'styled-components';
import { ReactComponent as Arrow } from '../../../asset/arrow.svg';

export const SelectContainer = styled.div`
  position: relative;
  width: fit-content;
  display: flex;
  flex-direction: column;
  font-weight: 400;
  font-size: 16px;
  letter-spacing: 0.46px;
  user-select: none;
`;

export const SelectZone = styled.div<{ width?: number, height?: number, borderColor?: string }>`
  display: flex;
  // width: ${({ width }) => (width ? `${width}px` : '118px')};
  width: 118px;
  height:${({height}) => height? `${height}px`:'42px'};
  border-radius: 30px;
  align-items: center;
  justify-content: space-between;
  border: ${({borderColor}) => borderColor? `1px solid ${borderColor}`:'1px solid #000'};
  padding: 0 20px;
`;

export const DropDownList = styled.ul<{ select: number, height?: number, borderColor?: string }>`
  position: absolute;
  // top: 48px;
  top: ${({height}) => height? `${height+6}px`: '48px'};
  left: 0;
  right: 0;
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 16px;
   border: ${({borderColor}) => borderColor? `1px solid ${borderColor}`:'1px solid #000'};
  border-radius: 16px;
  background-color: white;
  z-index: 100;

  ${({ select }) =>
    select &&
    `li:nth-of-type(${select}) {
  }`}
`;

export const DropDownItem = styled.li`
  border-radius: 4px;
  padding: 3px 6px;
  font-size: 16px;
  cursor: pointer;

  &:hover {
    background-color: ${({theme}) => theme.colors.primary};
    color: #fff;
  }
`;

export const StyledArrow = styled(Arrow)<{ open: boolean }>`
  transition: transform 250ms ease-out;
  cursor: pointer;

  ${({ open }) => open && `transform: rotate(-180deg);`}
`;

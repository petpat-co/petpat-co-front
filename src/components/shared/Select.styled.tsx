import styled from 'styled-components';
import { ReactComponent as Arrow } from '../../asset/arrowIcon.svg';

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

export const SelectZone = styled.div<{ width: number }>`
  display: flex;
  width: ${({ width }) => (width ? `${width}px` : '200px')};
  align-items: center;
  justify-content: space-between;
  border: 1px solid #ececec;
  padding: 0 8px;
`;

export const DropDownList = styled.ul<{ select: number }>`
  position: absolute;
  top: 32px;
  left: 0;
  right: 0;
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 4px;
  border: 1px solid #ececec;
  border-top: none;
  background-color: white;

  ${({ select }) =>
    select &&
    `li:nth-of-type(${select}) {
    background-color: #a09f9f;
  }`}
`;

export const DropDownItem = styled.li`
  border-radius: 4px;
  padding: 3px 6px;
  font-size: 16px;
  cursor: pointer;

  &:hover {
    background-color: #ececec;
  }
`;

export const StyledArrow = styled(Arrow)<{ open: boolean }>`
  transition: transform 250ms ease-out;
  cursor: pointer;

  ${({ open }) => open && `transform: rotate(-90deg);`}
`;

import styled from 'styled-components';
import theme from '../../../styles/theme';

// 게시판 작성화면 공통 스타일
export const InputSectionContainer = styled.div`
  display: flex;
  padding: 4%;
`;

export const InputTitleWrapper = styled.div`
  flex: 1;
  display: flex;
  gap: 6px;
  padding-top: 0.3%;
`;

export const InputTitleText = styled.h2`
  font-weight: ${theme.fontWeights.regular};
  font-size: ${theme.fontSizes.titleSize};
`;

export const InputSectionWrapper = styled.div`
  flex: 4;
  position: relative;
`;

export const RowContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  position: relative;
`;

export const ColumnContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  gap: 12px;
`;

export const InputSubText = styled.p`
  font-size: ${theme.fontSizes.xlg};
  color: ${theme.colors.primary};
  min-width: 50px;
`;

export const DividerLine = styled.div`
  flex: 1;
  height: 1px;
  background: ${theme.colors.borderColor};
`;

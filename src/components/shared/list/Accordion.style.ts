import styled from 'styled-components';
import theme from '../../../styles/theme';

export const ItemSection = styled.div`
  margin: 24px 0;
`;

export const TitleSection = styled.div`
  display: flex;
  flex-direction: column;
`;

export const TitleWrapper = styled.div<{ isMain?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${(props) => (props.isMain ? `0 10px 20px 10px` : `0 2px 10px 0`)};
`;

export const TitleText = styled.p<{ isMain?: boolean }>`
  font-size: ${(props) =>
    props.isMain ? theme.fontSizes.xxlg : theme.fontSizes.regular};
  font-weight: ${theme.fontWeights.lbold};
  color: ${(props) =>
    props.isMain ? theme.colors.primary : theme.colors.coolgray900};
`;

export const DividerLine = styled.div`
  height: 1px;
  background: ${theme.colors.primary};
`;

export const ContentSection = styled.div<{ isOpened: boolean }>`
  max-height: ${(props) => (props.isOpened ? 800 : 0)}px;
  overflow: hidden;
  transition: ${(props) =>
    props.isOpened ? 'all 0.5s ease-in' : 'all 0.3s ease-out'};
`;

export const ContentText = styled.p`
  font-size: ${theme.fontSizes.small};
  font-weight: ${theme.fontWeights.light};
  color: ${theme.colors.coolgray900};
  padding: 0 10px;
`;

export const DetailText = styled.li`
  padding: 12px 0;
  cursor: pointer;
`;

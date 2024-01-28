// ** Import lib
import styled from 'styled-components';

// ** Import utils
import theme from '../../../styles/theme';

export const ComponentContainer = styled.div`
  width: 100%;
  height: 100%;
  background-color: ${({ theme }) => theme.colors.coolgray200};
  padding-top: 150px;
`;

export const BestListSection = styled.div`
  width: 100%;
  padding: 80px 6%;
  border-radius: 0 0 50px 50px;
  background-color: ${theme.colors.white};
`;

export const SectionWrapper = styled.div`
  display: flex;
  gap: 48px;
  align-items: flex-start;
`;

export const TextWrapper = styled.div`
  flex: 1;
  flex-shrink: 0;
`;

export const TitleText = styled.p`
  font-size: ${theme.fontSizes.title};
  font-weight: ${theme.fontWeights.lbold};
  text-align: right;
`;

export const BodyText = styled.p`
  margin: 16px 0;
  font-size: ${theme.fontSizes.regular};
  font-weight: ${theme.fontWeights.regular};
  text-align: right;
`;

export const ListWrapper = styled.div<{ rowNum: number }>`
  flex: 3;
  display: grid;
  row-gap: 30px;
  column-gap: 12px;
  grid-template-columns: ${({ rowNum }) => `repeat(${rowNum}, 1fr)`};
`;

export const PostListSection = styled(BestListSection)`
  margin-top: 32px;
  border-radius: 50px 50px 0 0;
`;

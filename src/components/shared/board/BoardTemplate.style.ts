// ** Import lib
import styled from 'styled-components';

// ** Import utils
import theme from '../../../styles/theme';

export const ComponentContainer = styled.div`
  width: 100%;
  height: 100%;
  padding-top: 150px;

  // 24.03.02
  background-color: ${({ theme }) => theme.colors.coolgray200};
`;

export const BestListSection = styled.div`
  width: 100%;
  padding: 80px 6%;
  border-radius: 0 0 50px 50px;
  background-color: ${theme.colors.white};
`;

export const SectionWrapper = styled.div`
  display: flex;
  gap: 60px;
  align-items: flex-start;
`;

export const TextWrapper = styled.div`
  flex: 1;
  flex-shrink: 0;

  // 24.03 max-width - 문구 짤리는 현상
  //       margin-top 수정
  max-width: 280px;
  margin-top: 24px; // Accordion Menu랑 시작점 맞춤
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
  line-height: 24px;
  color: ${theme.colors.coolgray500};
`;

export const ListContainer = styled.div`
  flex: 3;
  display: flex;
  flex-direction: column;
`;

export const ListWrapper = styled.div<{ rowNum: number; minHeight?: number }>`
  // flex: 3;
  display: grid;
  row-gap: 30px;
  column-gap: 20px;
  grid-template-columns: ${({ rowNum }) => `repeat(${rowNum}, 1fr)`};
  position: relative; // MenuList Indicator의 상대 위치 설정
  margin-top: 24px; // Accordion Menu랑 시작점 맞춤
  min-height: ${(props) => (props.minHeight ? props.minHeight : 0)}px;
`;

export const PostListSection = styled(BestListSection)`
  margin-top: 32px;
  border-radius: 50px 50px 0 0;
`;

export const CategoryCntText = styled.span`
  font-size: ${theme.fontSizes.small};
  font-weight: ${theme.fontWeights.light};
  color: ${theme.colors.coolgray400};
  margin-left: 4px;
`;

export const SearchWrapper = styled.div`
  position: relative;
  display: flex;
`;

export const SearchButton = styled.button`
  position: absolute;
  right: 10px;
  bottom: 12px;
`;

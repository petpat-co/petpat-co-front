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

export const BestListWrapper = styled.div`
  display: flex;
  gap: 36px;
  background-color: red;
`;

export const TextWrapper = styled.div`
  flex: 1;
  background-color: ${theme.colors.second};
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

export const ListWrapper = styled.div`
  flex: 3;
  display: flex;
  justify-content: space-between;
  gap: 20px;
  background-color: ${theme.colors.hoverMain};

  // TODO: 말줄임표 스타일을 넣기 위해 List는 grid를 사용하고 List 내부의 Item은 flex를 사용하는데,
  // Item 컨테이너의 max-width를 주었을 때, Item간의 간격조정이 균등하게 안되는 이슈로 일단 List도 flex를 사용함
  // display: grid;
  // column-gap: 20px;
  // width: 100%;
  // grid-template-columns: repeat(3, auto);
`;

import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  height: 100%;
  background-color: ${({ theme }) => theme.colors.coolgray200};
`;

export const WidthWrapper = styled.div`
  margin: auto;
  width: 100%;
  padding: 80px 16px;
  border-radius: 0 0 50px 50px;
  background-color: #fff;
`;

export const ListWrapper = styled.div`
  margin: 32px 0;

  width: 100%;

  background-color: #fff;
  border-radius: 50px 50px 0 0;
`;

export const ListInner = styled.div`
  margin: auto;
  padding: 240px 16px 0 16px;
  max-width: 1440px;
  display: flex;
  justify-content: space-between;
  gap: 64px;
  align-items: flex-start;
`;

export const AccordianWrapper = styled.div`
  flex: 1;
  flex-shrink: 0;
`;

export const ListGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 24px;
  grid-row-gap: 48px;
  max-height: 100vh;
  // overflow-y: auto; 
  margin-bottom: 240px;

`;

export const TitleText = styled.h2`
  font-weight: 700;
  font-size: 32px;
  color: #fff;
`;

export const ButtonSpan = styled.span`
  font-weight: 500;
  font-size: 18px;
  color: #111827;
`;

export const SelectSection = styled.div`
  width: 1200px;
  margin: 70px auto 0;
  height: 111px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  @media ${({ theme }) => theme.device.web} {
    width: 100%;
  }
`;

export const LeftBox = styled.div`
  width: calc(100% - 150px);
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const FirstBox = styled.div`
  width: 100%;
  display: flex;
`;

export const HomeBox = styled.div`
  width: auto;
  display: flex;
  height: 30px;
  align-items: center;
  justify-content: space-between;

  & span {
    padding-right: 5px;
    font-size: ${({ theme }) => theme.fontSizes.xlg};
  }
`;

export const SelectWrap = styled.div`
  display: flex;
`;

export const SecondBox = styled.div`
  width: 100%;
  height: 36px;
  height: 54px;
  display: flex;
`;

export const CategoryBox = styled.div`
  width: 174px;
  height: 54px;
  display: flex;
  align-items: center;
  justify-content: space-around;
  border: 1px solid #ececec;
  border-radius: 4px;
  margin-right: 10px;
`;

export const RightBox = styled.div`
  width: 140px;
  padding-top: 66px;
  height: 100%;
`;

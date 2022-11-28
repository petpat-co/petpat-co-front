import styled from 'styled-components';

export const TitleText = styled.h2`
  font-weight: 700;
  font-size: 40px;
  color: #2b2b2b;
`;
export const ButtonSpan = styled.span`
  font-weight: 500;
  font-size: 22px;
  color: #2b2b2b;
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

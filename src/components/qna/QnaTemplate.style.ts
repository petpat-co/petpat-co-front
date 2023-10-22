import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  height: 100%;
  background-color: ${({ theme }) => theme.colors.coolgray100};
`;

export const BannerSection = styled.div`
  margin: 150px auto 0 auto;
  width: 100%;
  max-width: 1920px;
  height: 520px;
  justify-content: center;
  text-align: center;
  background-color: #fff;
  border-radius: 0 0 50px 50px;
  & > div {
    padding: 114px 0;
  }
`;

export const TitleText = styled.p`
  // font-weight: ${({ theme }) => theme.fontWeights.lbold};
  font-weight: 800;
  font-size: ${({ theme }) => theme.fontSizes.xxlarge};
  color: ${({ theme }) => theme.colors.primary};
`;

export const SubText = styled.h2`
  font-weight: 500;
  margin-top: 24px;
  font-size: ${({ theme }) => theme.fontSizes.regular};
`;

export const SearchInput = styled.input`
  width: 560px;
  height: 48px;
  border: none;
  box-sizing: border-box;
  border-bottom: ${({ theme }) => `2px solid ${theme.colors.primary}`};
`;

export const ContentsSection = styled.section`
  flex-direction: column;
  display: flex;
  width: 100%;
  max-width: 1920px;
  margin: 32px auto 0 auto;
  padding: 80px 100px;
  border-radius: 50px 50px 0 0;
  background-color: #fff;
`;

export const QnAToolWrap = styled.div`
  display: flex;
  margin-bottom: 60px;
  justify-content: space-between;
`;

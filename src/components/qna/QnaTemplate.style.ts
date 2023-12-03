import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  height: 100%;
  background-color: ${({ theme }) => theme.colors.coolgray200};
`;

export const BannerTitle = styled.div`
  font-weight: 700;
  font-size: 32px;
  color: #fff;
`;

export const ButtonSpan = styled.span`
  font-weight: 500;
  font-size: 18px;
  color: #111827;
`;

export const BannerSection = styled.div`
  margin: 0 auto;

  width: 100%;
  max-width: 1440px;
  height: 520px;

  background-color: #fff;
  border-radius: 0 0 50px 50px;

  text-align: center;

  & > div {
    padding: 114px 0;
  }

  & > .search {
    position: relative;
    margin: auto;
    padding: 0;
    width: fit-content;
  }

  & > div > .icon {
    position: absolute;
    right: 0;
    bottom: 12px;
  }
`;

export const TitleText = styled.p`
  font-weight: 800;
  font-size: ${({ theme }) => theme.fontSizes.xxlarge};
  color: ${({ theme }) => theme.colors.primary};
`;

export const SubText = styled.h2`
  font-weight: 500;
  margin-top: 24px;
  font-size: ${({ theme }) => theme.fontSizes.regular};
  color: #858585;
`;

export const SearchInput = styled.input`
  width: 560px;
  height: 48px;
  
  outline: none;

  border: none;
  box-sizing: border-box;
  border-bottom: ${({ theme }) => `2px solid ${theme.colors.primary}`};
`;

export const ContentsSection = styled.section`
  flex-direction: column;
  display: flex;
  width: 100%;
  max-width: 1440px;
  margin: 32px auto 0 auto;
  padding: 80px 100px;
  border-radius: 50px 50px 0 0;
  background-color: #fff;
`;

export const QnAToolWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const QnaTool = styled.div`
  display: flex;
  gap: 40px;
  margin-bottom: 60px;
  width: fit-content;
`;

export const CheckBoxes = styled.div`
  width: fit-content;
  display: flex;
  align-items: center;
  gap: 12px;
`;

import styled from 'styled-components';

export const Wrap = styled.div`
  width: 994px;
  margin: 70px auto 186px;
  height: auto;

  @media ${({ theme }) => theme.device.web} {
    width: 100%;
  }
`;
export const ImgWrap = styled.div`
  width: 100%;
  height: auto;
  margin: 20px 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
export const IconBox = styled.div<{ isRotate?: boolean }>`
  width: 78px;
  height: 78px;
  display: flex;
  align-items: center;
  justify-content: center;
  ${({ isRotate }) =>
    isRotate &&
    `
  transform:rotate(180deg);
  `}
`;
export const ImgBox = styled.div`
  width: calc(100% - 204px);
  height: 588px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
export const ImgBig = styled.div`
  width: calc(100% - 204px);
  height: 100%;
  border-radius: 14px;
  overflow: hidden;
  background-color: #ccc;
  & img {
    width: 100%;
  }
`;
export const ImgSmallBox = styled.div`
  width: 180px;
  height: 100%;
  overflow-y: scroll;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;

  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
  &::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Opera*/
  }
`;
export const ImgSmallInner = styled.div<{ length: number }>`
  width: 100%;
  height: ${({ length }) => (length ? `calc(180px * length)` : '100%')};
`;
export const ImgSmall = styled.div`
  width: 180px;
  height: 180px;
  border-radius: 14px;
  overflow: hidden;
  background-color: #ccc;
  margin-bottom: 23px;

  & img {
    width: 100%;
  }
`;

export const BgImgBox = styled.div`
  width: 180px;
  height: 180px;
  border-radius: 14px;
  overflow: hidden;
  background: rgba(0, 0, 0, 0.7);
  margin-bottom: 23px;
  & img {
    width: 100%;
    opacity: 0.8;
  }
`;
export const ProfileBox = styled.div`
  width: 100%;
  height: 108px;
  margin-top: 30px;
  padding-bottom: 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #d9d9d9;
`;
export const ProfileImg = styled.img`
  width: 78px;
  height: 78px;
  border-radius: 78px;
`;
export const NicknameAreaBox = styled.div`
  width: calc(100% - 165px);
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-around;
  padding-left: 24px;

  & > p:first-child {
    font-weight: 500;
    font-size: ${({ theme }) => theme.fontSizes.xxxlg};
  }

  & > p:last-child {
    font-size: ${({ theme }) => theme.fontSizes.xlg};
    color: #2b2b2b;
  }
`;
export const ReportBox = styled.div`
  width: 87px;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: ${({ theme }) => theme.fontSizes.xlg};
`;
export const ContentsBox = styled.div`
  width: 100%;
  height: auto;
  border-bottom: 1px solid #d9d9d9;
  padding: 24px 0;
`;
export const IngText = styled.p`
  font-weight: 700;
  font-size: 30px;
`;
export const DateText = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.xlg};
  color: #9d9d9d;
`;
export const TitleText = styled.p`
  width: 100%;
  font-size: 30px;
  line-height: 43px;
  word-break: break-all;
  white-space: pre-wrap;
  -moz-white-space: pre-wrap;
  margin-bottom: 40px;
`;
export const ContentText = styled.p`
  width: 100%;
  font-size: ${({ theme }) => theme.fontSizes.xxxlg};
  line-height: 32px;
  letter-spacing: 0.46px;
  word-break: break-all;
  white-space: pre-wrap;
  -moz-white-space: pre-wrap;
`;
export const PetProfileBox = styled.div`
  width: 100%;
  height: auto;
  padding: 28px 34px;
  background: #d9d9d9;
  border-radius: 14px;
  margin: 20px 0;

  & p {
    font-weight: 700;
    font-size: ${({ theme }) => theme.fontSizes.xlg};
  }

  & span {
    font-size: ${({ theme }) => theme.fontSizes.xlg};
    margin-left: 11px;
  }
`;
export const BottomIconBox = styled.div`
  width: 128px;
  height: 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
export const grayText = styled.span`
  color: #d9d9d9;
  font-size: ${({ theme }) => theme.fontSizes.lg};
`;
export const HashTag = styled.div`
  width: auto;
  padding: 8px 12px;
  border: 1px solid #cccccc;
  border-radius: 120px;
  margin-right: 12px;
  font-size: 14px;

  & span {
    font-weight: 700;
    color: #989898;
  }
`;
export const ButtonSpan = styled.span`
  color: #838383;
  height: 38px;
  font-weight: 700;
  font-size: 26px;
  padding-right: 10px;
  display: flex;
  align-items: center;
`;

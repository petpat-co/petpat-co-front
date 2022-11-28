import styled from 'styled-components';

export const Wrap = styled.div`
  width: 1200px;
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

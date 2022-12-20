import styled from 'styled-components';

export const ContentWrap = styled.section`
  width: 1200px;
  margin: 30px auto 0;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 12px;
  @media ${({ theme }) => theme.device.web} {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
  }
`;
export const ListWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  width: 282px;
  height: 421px;
  margin-bottom: 80px;
  @media ${({ theme }) => theme.device.web} {
    width: 232px;
    height: 369px;
    margin-bottom: 64px;
  }
  @media ${({ theme }) => theme.device.laptop} {
    margin-bottom: 32px;
  }
`;
export const ImageWrap = styled.img`
  width: 100%;
  height: 285px;
  border-radius: 14px;
  object-fit: cover;
`;
export const ContentsWrap = styled.div`
  width: 100%;
  height: 122px;
  margin-top: 12px;
  flex-direction: column;
  justify-content: space-between;
`;
export const StatusBox = styled.p`
  width: 100%;
  font-weight: 700;
  font-size: ${({ theme }) => theme.fontSizes.xxxlg};
`;
export const TitleBox = styled.p`
  width: 100%;
  font-weight: 400;
  font-size: ${({ theme }) => theme.fontSizes.xxxlg};
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  word-break: break-all;
`;
export const InfoBox = styled.div`
  width: 100%;
  display: flex;
  height: 30px;
  justify-content: space-between;
  align-items: center;
`;

export const NicknameBox = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.xlg};
  color: #2b2b2b;
  width: calc(100% - 128px);
`;
export const IconBox = styled.div`
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

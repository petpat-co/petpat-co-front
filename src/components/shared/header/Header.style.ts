import styled from 'styled-components';

export const HeaderWrap = styled.header<{ isBorder: boolean }>`
  width: 100%;
  height: 82px;
  padding: 0 70px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${({ isBorder }) => isBorder && `border-bottom: 2px solid #D9D9D9;`}
  @media ${({ theme }) => theme.device.web} {
    width: 100%;
  }
`;
export const LogoBox = styled.div`
  width: 155px;
  height: 59px;
  background: #d9d9d9;
  display: flex;
  align-items: center;
  cursor: pointer;
  justify-content: center;
`;
export const MenuBox = styled.ul`
  width: 219px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
export const MenuItems = styled.li<{ isSelected: boolean }>`
  font-weight: 700;
  font-size: ${({ theme }) => theme.fontSizes.xxxlg};
  color: ${({ isSelected }) => (isSelected ? '#FBBC05' : '#2b2b2b')};
  cursor: pointer;
`;
export const WriteLoginSearchBox = styled.div`
  width: 323px;
  height: 42px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
export const WriteButton = styled.button`
  width: auto;
  padding: 0 20px;
  height: 44px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 700;
  font-size: ${({ theme }) => theme.fontSizes.xlg};
  border: 2px solid #2b2b2b;
  border-radius: 120px;
  color: #2b2b2b;
`;
export const LoginSearchBox = styled.div`
  width: 143px;
  height: 42px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
export const LoginButton = styled.button`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 91px;
  height: 42px;
  background: #2b2b2b;
  border-radius: 120px;
  font-weight: 700;
  color: #fff;
  font-size: ${({ theme }) => theme.fontSizes.xlg};
`;
//로그인 이후 스타일
export const HeaderRightInner = styled.div`
  width: 180px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

import styled from "styled-components";

export const HeaderWrap = styled.header`
  width: 100%;
  height: 82px;
  padding: 0 70px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
export const LogoBox = styled.div`
  width: 155px;
  height: 59px;
  background: #d9d9d9;
  display: flex;
  align-items: center;
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
  font-size: 22px;
  color: ${({ isSelected }) => (isSelected ? "#FBBC05" : "#2b2b2b")};
  cursor: pointer;
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
  color: #fff;
`;

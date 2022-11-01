import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import * as Styled from "./Header.style";
import { ReactComponent as Search } from "../../asset/searchIcon.svg";
const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [pathname, setPathname] = useState(location.pathname);

  const isWriteButton =
    location.pathname.includes("/rehome") ||
    location.pathname.includes("/trade");
  const onClickMenu = (path: string) => {
    navigate(path);
    setPathname(path);
  };
  return (
    <>
      <Styled.HeaderWrap>
        <Styled.LogoBox>로고</Styled.LogoBox>
        <Styled.MenuBox>
          {menuList.map((item) => (
            <Styled.MenuItems
              key={item.text}
              onClick={() => onClickMenu(item.path)}
              isSelected={pathname === item.path}
            >
              {item.text}
            </Styled.MenuItems>
          ))}
        </Styled.MenuBox>
        {isWriteButton ? (
          <Styled.WriteLoginSearchBox>
            <Search stroke="#333" />
            <Styled.LoginButton>로그인</Styled.LoginButton>
          </Styled.WriteLoginSearchBox>
        ) : (
          <Styled.LoginSearchBox>
            <Search stroke="#333" />
            <Styled.LoginButton>로그인</Styled.LoginButton>
          </Styled.LoginSearchBox>
        )}
      </Styled.HeaderWrap>
    </>
  );
};

export default Header;

const menuList = [
  {
    text: "용품 거래",
    path: "/trade",
  },
  {
    text: "분양글",
    path: "/rehome",
  },
  {
    text: "QnA",
    path: "/",
  },
];

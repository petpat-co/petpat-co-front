import { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as S from "./styled.Header";
import { ReactComponent as Search } from "../../asset/searchIcon.svg";
const Header = () => {
  const navigate = useNavigate();
  const [pathname, setPathname] = useState("/");
  const onClickMenu = (path: string) => {
    navigate(path);
    setPathname(path);
  };
  return (
    <>
      <S.HeaderWrap>
        <S.LogoBox>로고</S.LogoBox>
        <S.MenuBox>
          {menuList.map((item) => (
            <S.MenuItems
              key={item.text}
              onClick={() => onClickMenu(item.path)}
              isSelected={pathname === item.path}
            >
              {item.text}
            </S.MenuItems>
          ))}
        </S.MenuBox>
        <S.LoginSearchBox>
          <Search stroke="#333" />
          <S.LoginButton>로그인</S.LoginButton>
        </S.LoginSearchBox>
      </S.HeaderWrap>
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

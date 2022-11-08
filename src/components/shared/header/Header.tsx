import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import * as S from "./Header.style";
import { ReactComponent as Search } from "../../../asset/searchIcon.svg";
const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [pathname, setPathname] = useState(location.pathname);

  const isWriteButton =
    location.pathname.includes("/rehome") ||
    location.pathname.includes("/trade") ||
    location.pathname.includes("/qna");

  //pathname 바뀔때마다 state 변경
  useEffect(() => {
    setPathname(location.pathname);
  }, [location]);
  const onClickMenu = (path: string) => {
    navigate(path);
    setPathname(path);
  };
  //글쓰기 버튼 클릭시
  const onClickWriteButton = () => {
    switch (pathname) {
      case "/rehome":
        return navigate("/rehome/write");
      case "/trade":
        return navigate("/");
      case "/qna":
        return navigate("/");
      default:
        break;
    }
  };
  const onClickMainHome = () => {
    navigate("/");
  };
  //글쓰기 버튼 설정
  const buttonText = () => {
    switch (pathname) {
      case "/rehome":
        return "분양 글쓰러가기";
      case "/trade":
        return "물품글 올리기";
      case "/qna":
        return "질문 하러가기";
      default:
        break;
    }
  };
  return (
    <>
      <S.HeaderWrap isBorder={isWriteButton}>
        <S.LogoBox onClick={onClickMainHome}>로고</S.LogoBox>
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
        {isWriteButton ? (
          <S.WriteLoginSearchBox>
            <Search stroke="#333" />
            <S.WriteButton onClick={onClickWriteButton}>
              {buttonText()}
            </S.WriteButton>
            <S.LoginButton>로그인</S.LoginButton>
          </S.WriteLoginSearchBox>
        ) : (
          <S.LoginSearchBox>
            <Search stroke="#333" />
            <S.LoginButton>로그인</S.LoginButton>
          </S.LoginSearchBox>
        )}
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
    path: "/qna",
  },
];

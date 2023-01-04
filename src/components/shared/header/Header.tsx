import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ReactComponent as Bell } from 'src/asset/bellIcon.svg';
import { ReactComponent as BookMark } from 'src/asset/bookmarkIcon.svg';
import { ReactComponent as Search } from 'src/asset/searchIcon.svg';
import { ReactComponent as UserIcon } from 'src/asset/userCircleIcon.svg';
import { HeaderStyle as S } from './Header.style';
const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [pathname, setPathname] = useState(location.pathname);

  const isWriteButton =
    location.pathname.includes('/rehome') ||
    location.pathname.includes('/trade') ||
    location.pathname.includes('/qna');

  //로그인 기능 추가되면 수정할 예정 -유림 2022.11.15
  const isLogin = location.pathname.includes('/rehome/write');

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
      case '/rehome':
        return navigate('/rehome/write');
      case '/trade':
        return navigate('/trade/write');
      case '/qna':
        return navigate('/qna/write');
      default:
        break;
    }
  };
  const onClickMainHome = () => {
    navigate('/');
  };
  //글쓰기 버튼 설정
  const buttonText = () => {
    switch (pathname) {
      case '/rehome':
        return '분양 글쓰러가기';
      case '/trade':
        return '물품글 올리기';
      case '/qna':
        return '질문 하러가기';
      default:
        break;
    }
  };
  return (
    <>
      {isLogin ? (
        <S.HeaderWrap isBorder={isWriteButton}>
          <S.LogoBox onClick={onClickMainHome}>로고</S.LogoBox>
          <S.MenuBox>
            {menuList.map((item) => (
              <S.MenuItems
                key={item.text}
                onClick={() => onClickMenu(item.path)}
                isSelected={pathname.includes(item.path)}
              >
                {item.text}
              </S.MenuItems>
            ))}
          </S.MenuBox>
          <S.HeaderRightInner>
            <Search
              stroke="#333"
              onClick={() => {
                console.log('??');
              }}
            />
            <Bell stroke="#252525" strokeWidth="2" />
            <BookMark stroke="#252525" strokeWidth="2" />
            <UserIcon />
          </S.HeaderRightInner>
        </S.HeaderWrap>
      ) : (
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
      )}
    </>
  );
};

export default Header;

const menuList = [
  {
    text: '용품 거래',
    path: '/trade',
  },
  {
    text: '분양글',
    path: '/rehome',
  },
  {
    text: 'QnA',
    path: '/qna',
  },
];

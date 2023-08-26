import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ReactComponent as Bell } from 'src/asset/bellIcon.svg';
import { ReactComponent as BookMark } from 'src/asset/bookmarkIcon.svg';
import { Icon } from 'src/asset/icon/Index';
import { Images } from 'src/asset/images';

import { ReactComponent as UserIcon } from 'src/asset/userCircleIcon.svg';
import { useModal } from 'src/hooks/modal/useModal';
import { v4 } from 'uuid';
import { HeaderStyle as S } from './Header.style';
import { useAppDispatch } from 'src/core/store';
import { logOutApi } from 'src/core/redux/user/userSlice';

const Header = () => {
  const navigate = useNavigate();
  const appdispatch = useAppDispatch();
  const location = useLocation();
  const modal = useModal();
  const [pathname, setPathname] = useState(location.pathname);

  const isWriteButton =
    location.pathname.includes('/rehome') ||
    location.pathname.includes('/trade') ||
    location.pathname.includes('/qna');

  //로그인 기능 추가되면 수정할 예정 -유림 2022.11.15
  const isLogin = location.pathname.includes('/rehome/write');

  // 유나 
  // 2023.04.14
  const onClickLogin = () => {
    navigate('/login');
  };
  // 2023.06.14
  const token = localStorage.getItem("token");
  const onClickMyPage = () => {
    navigate('/mypage');
  };
  const logOut = () => {
    appdispatch(logOutApi(""));
  }


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

  const onClickSearch = () => {
    modal.search();
  };
  return (
    <>
      {isLogin ? (
        <S.HeaderWrap isBorder={isWriteButton}>
          <S.LogoBox onClick={onClickMainHome}>
            <img src={Images.Global.Logo} alt="logo" />
          </S.LogoBox>
          <S.GridBox>
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
              <Icon.Search
                size="30"
                color="#333"
                onClick={() => {
                  console.log('??');
                }}
              />
              <Bell stroke="#252525" strokeWidth="2" />
              <BookMark stroke="#252525" strokeWidth="2" />
              <UserIcon />
            </S.HeaderRightInner>
          </S.GridBox>
        </S.HeaderWrap>
      ) : (
        <S.HeaderWrap isBorder={isWriteButton}>
          <S.LogoBox onClick={onClickMainHome}>
            <img src={Images.Global.Logo} alt="logo" />
          </S.LogoBox>
          <S.GridBox>
            <S.MenuBox>
              {menuList.map((item) => (
                <S.MenuItems
                  key={v4()}
                  onClick={() => onClickMenu(item.path)}
                  // isSelected={false}
                  isSelected={pathname.includes(item.path)}
                >
                  {item.text}
                </S.MenuItems>
              ))}
            </S.MenuBox>
            <S.LoginSearchBox>
              <S.CursorBox onClick={onClickSearch}>
                <Icon.Search
                  size="30"
                  color="#333"
                  onClick={() => {
                    console.log('??');
                  }}
                />
              </S.CursorBox>
              
              {token? 
              <>
              <S.LoginButton onClick={onClickMyPage}>마이페이지</S.LoginButton> 
              <S.LoginButton onClick={logOut}>로그아웃</S.LoginButton>
              </>
              : <S.LoginButton onClick={onClickLogin}>로그인</S.LoginButton>}
            
            </S.LoginSearchBox>
          </S.GridBox>

          {/* {isWriteButton ? (
            <S.WriteLoginSearchBox>
              <Search stroke="#333" />
              <S.WriteButton onClick={onClickWriteButton}>
                {buttonText()}
              </S.WriteButton>
              <S.LoginButton>로그인</S.LoginButton>
            </S.WriteLoginSearchBox>
          ):null} */}
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
    text: 'main',
    path: '/',
  },
  {
    text: 'main',
    path: '/',
  },
];

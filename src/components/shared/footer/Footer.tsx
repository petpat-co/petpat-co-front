import { useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { FooterStyle as S } from './Footer.style';

const Footer = () => {
  const mainPage = '/';
  const { pathname } = useLocation();
  const isMainPage = useMemo(() => mainPage === pathname, [pathname]);
  return (
    <S.FooterWrap isMainPage={isMainPage}>
      <S.FooterInner></S.FooterInner>
    </S.FooterWrap>
  );
};

export default Footer;

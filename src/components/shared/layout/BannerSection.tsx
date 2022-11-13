import React from 'react';
import * as S from './BannerSection.styled';

/** TODO:
 *       - 메인이랑 같이 쓰려면 height 값을 받아야할 거 같은데 지금 정해진 높이는 너무 크네요..
 *         일단 padding만 설정해두겠습니다..
 *       - 회색에 대한 color 팔레트 요청해야겠습니다
 */

const BannerSection = ({ children }: { children: React.ReactNode }) => {
  return <S.BannerContainer>{children}</S.BannerContainer>;
};

export default BannerSection;

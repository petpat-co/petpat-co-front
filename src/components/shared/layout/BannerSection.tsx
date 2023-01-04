import React from 'react';
import styled from 'styled-components';

/** TODO:
 *       - 메인이랑 같이 쓰려면 height 값을 받아야할 거 같은데 지금 정해진 높이는 너무 크네요..
 *         일단 padding만 설정해두겠습니다..
 *       - 회색에 대한 color 팔레트 요청해야겠습니다
 */

const BannerSection = ({ children }: { children: React.ReactNode }) => {
  return <BannerContainer>{children}</BannerContainer>;
};

export default BannerSection;

const BannerContainer = styled.div`
  width: 100%;
  padding: 3rem 0;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  justify-content: center;
  align-items: center;
  background: #f1f1f1;
`;

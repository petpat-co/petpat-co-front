import styled from 'styled-components';

export namespace FooterStyle {
  export const FooterWrap = styled.footer<{ isMainPage: boolean }>`
    width: 100%;
    height: 344px;
    position: relative;
    background-color: ${({ theme }) => theme.colors.main};
    ${({ isMainPage }) =>
      isMainPage &&
      `
      position: absolute;
      top:4700px;
      z-index:3;
    `};
  `;
  export const FooterInner = styled.div`
    width: 1200px;
    height: 100%;
    margin: 0 auto;
    @media ${({ theme }) => theme.device.web} {
      width: 100%;
    }
  `;
}

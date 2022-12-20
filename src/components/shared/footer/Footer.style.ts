import styled from 'styled-components';

export const FooterWrap = styled.footer`
  width: 100%;
  height: 486px;
  background-color: #1e1e1e;
`;
export const FooterInner = styled.div`
  width: 1200px;
  height: 100%;
  margin: 0 auto;
  @media ${({ theme }) => theme.device.web} {
    width: 100%;
  }
`;

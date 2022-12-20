import styled from 'styled-components';

export const Wrap = styled.div`
  width: 1200px;
  margin: 46px auto 66px;
  height: auto;

  @media ${({ theme }) => theme.device.web} {
    width: 100%;
  }
`;

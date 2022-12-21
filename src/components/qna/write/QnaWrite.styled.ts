import styled from 'styled-components';

export const Wrap = styled.div`
  width: 1200px;
  margin: 46px auto 66px;
  height: auto;

  @media ${({ theme }) => theme.device.web} {
    width: 100%;
    padding: 0 16px;
  }
`;
export const LengthText = styled.span`
  width: auto;
  height: 29px;
  position: absolute;
  right: 10px;
  bottom: 11px;
  font-size: 20px;
  line-height: 29px;
  color: #1e1e1e;
`;
export const ButtonWrap = styled.div`
  width: 100%;
  height: 66px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-top: 20px;
`;

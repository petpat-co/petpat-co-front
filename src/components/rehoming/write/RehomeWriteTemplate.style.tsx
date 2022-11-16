import styled from 'styled-components';
import { preventDrag } from '../../../utils/util';

export const Wrap = styled.section`
  width: 1200px;
  margin: 0 auto;

  @media ${({ theme }) => theme.device.web} {
    width: 100%;
  }
`;
export const ImageInputWrap = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding: 30px 0;
  height: 440px;
`;
export const ImageTextBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
  width: 163px;
  height: 63px;
  ${preventDrag}
  & > span {
    font-size: 20px;
    color: #848484;
  }
`;
export const ImageText = styled.p`
  font-weight: 500;
  font-size: 30px;
  margin-right: 5px;
`;
export const ImageWrap = styled.div`
  width: calc(100% -200px);
  display: flex;
  justify-content: space-between;
  height: 282px;
`;
export const ImageInner = styled.div`
  width: 282px;
  height: 282px;
  padding-left: 24px;
`;

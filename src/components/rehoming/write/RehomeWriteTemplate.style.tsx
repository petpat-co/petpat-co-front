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
export const ImageNoticeBox = styled.div`
  width: calc(100% -200px);
  height: 380px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;
export const ImageWrap = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  height: 282px;
`;
export const ImageInner = styled.div`
  width: 282px;
  height: 282px;
  padding-left: 24px;
`;
export const NoticeBox = styled.p`
  width: 100%;
  font-weight: 500;
  font-size: 18px;
  line-height: 26px;
  color: #858585;
`;

//제목 input style
export const TitleInputWrap = styled.div`
  width: 100%;
  height: 123px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 30px 0;
  border-top: 1px solid #d9d9d9;
  border-bottom: 1px solid #d9d9d9;

  & h2 {
    font-weight: 500;
    font-size: 30px;
    padding: 10px;
  }
`;
export const InputLengthBox = styled.div`
  width: calc(100% - 120px);
  height: 123px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
export const InputWrap = styled.div`
  width: calc(100% - 102px);
`;
export const LengthWrap = styled.div`
  width: 78px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  color: #1e1e1e;
`;

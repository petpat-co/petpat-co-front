import styled from 'styled-components';


export const Wrap = styled.section`
  width: 1440px;
  margin: 0 auto;

  @media ${({ theme }) => theme.device.web} {
    width: 100%;
  }
`;

export const TitleText = styled.h2`
  font-weight: 700;
  font-size: 32px;
  color: #fff;
`;

//제목 input style
export const TitleInputWrap = styled.div`
  width: 100%;
  height: 123px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 30px 0;
  border-bottom: 1px solid #d9d9d9;
`;
export const H2 = styled.h2`
  font-weight: 500;
  font-size: 24px;
  padding: 10px;
  width: 200px;
`;

export const InfoTitle = styled.p`
//  margin: 40px 0;
  padding: 4%;
  font-weight: 700;
  font-size: 32px;
  color: ${({ theme }) => theme.colors.primary};
`;

export const InputLengthBox = styled.div`
  width: calc(100% - 120px);
  height: 123px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
export const InputWrap = styled.div<{ width?: string }>`
  width: ${({ width }) => (width ? width : 'calc(100% - 102px)')};
  display: flex;
  align-items: center;
  gap: 24px;
`;

export const CheckboxWrapper = styled.div<{width?:string}>`
  width: ${({width}) => width? width : '80px'};
  display: flex;
  gap: 12px;
  align-items: center;

  & > p {
    font-weight: 500;
  }
`

export const LengthWrap = styled.div`
  width: auto;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  color: ${({ theme }) => theme.colors.primary};
`;
// category
// export const GrayWrap = styled.div<{ isNoBorder?: boolean }>`
//   width: 100%;
//   padding: 30px 0;
//   border-bottom: ${({ isNoBorder }) =>
//     isNoBorder ? null : '1px solid #d9d9d9'};
//   display: flex;
//   justify-content: space-between;
// `;
export const GrayWrap = styled.div`
  width: 100%;
  padding: 30px 0;
  display: flex;
  justify-content: space-between;
`;

export const GrayBox = styled.div`
  width: calc(100% - 200px);
  height: 320px;
  background-color: #d9d9d9;
`;
export const InputButtonWrap = styled.div`
  width: calc(100% - 200px);
  height: fit-content;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  & div {
    display: flex;
    gap: 16px;
  }
  & button {
    font-size: ${({ theme }) => theme.fontSizes.xlg};
  }
`;
export const InputBox = styled.div`
  width: calc(100% - 200px);
  display: flex;
  & span {
    width: 39px;
    height: 49px;
    margin-left: 24px;
    font-size: ${({ theme }) => theme.fontSizes.xxlg};
    display: flex;
    justify-content: center;
    align-items: center;
    color: #1e1e1e;
  }
`;
export const TextAreaBox = styled.div`
  width: calc(100% - 200px);
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;

export const ButtonWrap = styled.div`
  width: 100%;
  height: 110px;
  margin-top: 340px;
  background-color: #d9d9d9;
`;
export const ButtonInner = styled.div`
  width: 1200px;
  height: 100%;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: end;

  & span {
    font-weight: 700;
    font-size: 26px;
  }
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
  ${({ theme }) => theme.dragStyles.preventDrag};
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
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 16px;
`;

export const ImageInner = styled.div`
  width: 236px;
  height: 236px;
`;

export const NoticeBox = styled.p`
  width: 100%;
  font-weight: 500;
  font-size: 18px;
  line-height: 26px;
  color: #858585;
`;



export const HR = styled.hr`
border: none;
height: 1px;
background-color: ${({theme}) => theme.colors.coolgray100};
`

export const Grid = styled.div`
  width: 100%;
  display: grid;
  gap: 32px 0;
  grid-template-columns: repeat(3, 1fr);
`
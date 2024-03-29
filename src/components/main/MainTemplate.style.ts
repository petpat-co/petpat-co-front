import styled from 'styled-components';

export namespace MainTemplateStyle {
  export const MainWrap = styled.div`
    width: 100%;
    height: auto;
    position: relative;
  `;
  export const TopImgBox = styled.div`
    width: 100%;
    height: 1107px;
    position: relative;
    top: 0px;
    background-color: ${({ theme }) => theme.colors.main};
    ${({ theme }) => theme.dragStyles.prventDrag};

    & img {
      width: 100%;
    }
  `;

  export const SubIntro = styled.p`
    width: 260px;
    height: 72px;
    word-break: break-all;
    white-space: pre-wrap;
    -moz-white-space: pre-wrap;
    font-weight: 500;
    font-size: 16px;
    line-height: 150%;
    letter-spacing: -0.02em;
    color: #ffffff;
    top: 150px;
    left: 100px;
    position: absolute;
    z-index: 8;
    ${({ theme }) => theme.dragStyles.prventDrag};
  `;
  export const MainInner = styled.div`
    width: 1920px;
    height: auto;
    background-color: ${({ theme }) => theme.colors.main};
    position: absolute;
    top: 900px;
    left: 50%;
    margin-left: -960px;
    z-index: 2;
    @media ${({ theme }) => theme.device.web} {
      width: 100%;
      left: 0;
      margin-left: 0;
    }
  `;

  export const SectionWrap = styled.div`
    width: 100%;
    height: auto;
    position: relative;
    top: -90px;

    background-color: ${({ theme }) => theme.colors.main};
  `;
  export const SectionInner = styled.div`
    width: 100%;
    height: 1002px;
    background-color: #fff;
    border-radius: 50px;
    position: relative;
    padding: 80px 100px;
    top: -40px;
  `;
  export const SectionContentsWrap = styled.div`
    margin-top: 40px;
    width: 100%;
    height: 750px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  `;
  export const MbtiBox = styled.div<{ url: string }>`
    width: 848px;
    height: 100%;
    border-radius: 30px;
    border: 1px solid #000;
    padding: 30px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    background-image: url(${({ url }) => url});
    background-size: 725px 616px;
    background-repeat: no-repeat;
    background-position: bottom 10px right 0px;
  `;
  export const TipWrap = styled.div`
    width: calc(100% - 872px);
    height: 100%;
  `;
  export const Beginner = styled.div`
    width: calc(50% - 12px);
    height: 376px;
    border-radius: 30px;
    border: 1px solid #000;
    padding: 30px;
    background-color: ${({ theme }) => theme.colors.second};
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  `;
  export const PictureBox = styled.div<{ url: string }>`
    width: calc(50% - 12px);
    height: 100%;
    border-radius: 30px;
    border: 1px solid #000;
    padding: 30px;
    background-color: ${({ theme }) => theme.colors.main};
    background-image: url(${({ url }) => url});
    background-size: 264px 147px;
    background-repeat: no-repeat;
    background-position: bottom 10px right 0px;
    display: flex;
    justify-content: space-between;
  `;
  export const MousePicBox = styled.div<{ url: string }>`
    width: 100%;
    height: 350px;
    margin-top: 24px;
    border-radius: 30px;
    border: 1px solid #000;
    padding: 30px;
    background-color: ${({ theme }) => theme.colors.grayScale.gray100};
    background-image: url(${({ url }) => url});
    background-size: 363px 183px;
    background-repeat: no-repeat;
    background-position: bottom 50px right 0px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  `;
}
export namespace GoodsTradeSectionStyled {
  export const TradeWrap = styled.div`
    width: 100%;
    height: auto;
    padding: 80px 0 0;
    background: #ffffff;
    border-radius: 50px;
    position: relative;
  `;
  export const SlideBox = styled.div`
    width: 100%;
    height: 750px;
    position: relative;
    margin-top: 40px;
    overflow: hidden;
  `;
  interface SlideStyledProps {
    isSelected: boolean;
    bg: string;
    right: string;
    selectedRight: string;
    idx: number;
    curIdx: number;
  }
  export const SlideInner = styled.div<SlideStyledProps>`
    width: 80%;
    height: 100%;
    position: absolute;
    border: ${({ isSelected }) => (isSelected ? 'none' : '1px solid #000')};
    border-radius: 30px;
    background-color: ${({ bg }) => bg};
    right: 0;
    transform: translateX(
      ${({ right, curIdx, idx, selectedRight }) =>
        curIdx >= idx ? selectedRight : right}
    );
    display: flex;
    align-items: center;
    justify-content: center;
    transition: transform 300ms cubic-bezier(0.4, 0, 0.2, 1);
    z-index: ${({ idx }) => idx};
  `;
  export const NumberText = styled.p`
    font-family: 'Archivo', sans-serif;
    font-size: 100px;
    position: absolute;
    bottom: 20px;
    right: 20px;
    font-weight: 900;
    z-index: 9;
  `;
  export const SlideContents = styled.div<{ url: string }>`
    width: 100%;
    position: relative;
    height: 100%;
    padding: 50px 100px;
    background-image: url(${({ url }) => url});
    background-size: 100% 750px;
    background-repeat: no-repeat;
  `;
  export const IconBox = styled.div`
    width: auto;
    height: 42px;
    position: absolute;
    top: 50px;
    right: 100px;
    background: ${({ theme }) => theme.colors.main};
    border: 1px solid #000000;
    border-radius: 30px;
    display: flex;
    align-items: center;
    padding: 0 16px;

    & p {
      ${({ theme }) => theme.dragStyles.preventDrag};
      font-weight: 600;
      font-size: 16px;
      line-height: 22px;
      margin: 0 12px 0 5px;
    }
  `;
  export const InfoTextBox = styled.div`
    width: 266px;
    height: auto;
    position: absolute;
    top: 124px;
    right: 100px;
  `;
}

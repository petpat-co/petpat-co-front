import styled from 'styled-components';

export namespace MainTemplateStyle {
  export const Wrap = styled.div`
    width: 100%;
    height: auto;
    position: relative;
    background-color: ${({ theme }) => theme.colors.main};
  `;

  export const TopImgBox = styled.div`
    width: 100%;
    height: 1107px;
    position: absolute;
    top: 0px;
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
    ${({ theme }) => theme.dragStyles.prventDrag};
  `;
  export const SectionWrap = styled.div`
    width: 100%;
    height: auto;
    position: absolute;
    top: 730px;
    z-index: 9;
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
}

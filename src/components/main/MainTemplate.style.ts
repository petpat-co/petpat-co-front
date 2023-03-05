import styled from 'styled-components';

export namespace MainTemplateStyle {
  export const Wrap = styled.div`
    width: 100%;
    height: auto;
    position: relative;
  `;

  export const TopImgBox = styled.div`
    width: 100%;
    height: 1107px;
    position: absolute;
    top: 0px;

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
  `;
}

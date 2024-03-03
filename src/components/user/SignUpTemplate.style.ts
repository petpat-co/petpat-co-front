import styled from 'styled-components';

export namespace SignUpTemplateStyle {
  export const Container = styled.div`
    width: 100%;
    height: 100vh;
  `;

  export const Wrap = styled.div`
    padding: 200px 0;
    margin: auto;
    width: 830px;
    height: auto;

    // border: 1px solid red;
  `;

  export const InputGrid = styled.div`
    display: grid;
    height: 460px;
    grid-template-rows: repeat(4, 1fr 0.3fr);
    align-items: center;
  `;

  export const InputWrap = styled.div`
    position: relative;
    height: fit-content;
    width: 100%;
  `;

  export const InputFlexWrap = styled.div`
    display: flex;
    width: 100%;
  `;

  export const Text = styled.p`
    position: absolute;
    font-size: 14px;
    top: 50%;
    right: 40px;
    transform: translate(0, -50%);
  `;

  export const SnsLoginButtons = styled.div`
    display: grid;
    width: 360px;
    grid-template-columns: repeat(5, 1fr);
  `;

  export const Section = styled.div`
    width: fit-content;
    height: fit-content;
  `;
}

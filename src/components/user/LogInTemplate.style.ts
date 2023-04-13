import styled from 'styled-components';


interface StyledProps {
  border?: boolean;
}

export namespace LogInTemplateStyle {
  export const Wrap = styled.div`
    margin: 300px auto;
    width: 350px;
    height: auto;

    // border: 1px solid red;
  `;

  export const GreetingWrap = styled.div`
    margin: 24px 0;
    width: 100%;
    height: auto;
  `;

  export const InputWrap = styled.div`
    margin: 12px 0;
    width: 100%;
    height: auto;
  `;

  export const CheckRememberMe = styled.div`
    display: flex;
    margin: 24px 0;
    width: 100%;
    height: auto;
  `;

  export const SnsLoginButtons = styled.div`
    margin: 30px auto;
    padding: 0 15px;
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    width: 100%;
  `;

  export const Section = styled.div`
    width: fit-content;
    height: fit-content;
    margin: auto;
  `;

  export const FindSection = styled.div<StyledProps>`
    height: 14px;
    margin: auto 8px;
    border-right: ${({ border }) => (border ? '1px solid black' : 'none' )};

  `;

  export const FindUserGrid = styled.div`
    display: grid; 
    grid-template-columns: repeat(5, auto);
    width: 300px;
    height: auto;
    margin: auto;
    justify-content: center;
  `;

}

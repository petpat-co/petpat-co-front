import styled from 'styled-components';

export namespace MainSecondTemplateStyle {
  export const SecondSectionWrap = styled.div`
    display: flex;
    background: white;
    border-radius: 50px;
    padding: 80px;
    margin-top: 40px;
  `;

  export const TextWrap = styled.div`
    display: flex;
    flex-direction: column;

    > p {
      width: 100%;
      font-weight: 700;
      font-size: 30px;
      line-height: 130%;
      margin: 48px 0 40px 0;
    }

    > span {
      font-weight: 400;
      font-size: 16px;
      line-height: 150%;
      letter-spacing: -0.02em;
    }
  `;

  export const CardWrap = styled.div`
    display: flex;
    margin-left: 150px;

    > div {
      margin-right: 24px;
    }
  `;
}

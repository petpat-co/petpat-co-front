import styled from 'styled-components';

export namespace MainCardTemplateStyle {
  export const MainCardWrap = styled.div`
    display: flex;
    flex-direction: column;
    > div {
      > img {
        border: 1px solid black;
        border-radius: 20px;
        height: 412px;
      }

      > h1 {
        font-weight: 700;
        font-size: 24px;
        line-height: 35px;
      }

      > p {
        font-weight: 400;
        font-size: 16px;
        line-height: 23px;
        margin: 16px 0;
      }

      > div {
        display: flex;
        justify-content: space-between;
        align-items: center;
        p {
          font-weight: 400;
          font-size: 14px;
          line-height: 20px;
          display: flex;
          align-items: center;
          color: #9ca3af;
        }
        > div {
          display: flex;
          font-weight: 400;
          font-size: 16px;
          line-height: 23px;
          display: flex;
          align-items: center;
          color: #d9d9d9;

          > p {
            margin-right: 10px;
          }
        }
      }
    }
  `;
}

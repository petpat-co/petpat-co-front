import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  height: 100%;
  max-width: 700px;
  max-height: 700px;
  min-width: 200px;
  min-height: 200px;
  
  border: 1px solid #000;
  border-radius: 30px;

  overflow: hidden;
  `;

  export const Carousel = styled.div`
    display: flex;

  `
  
  export const Image = styled.div<{ src: string }>`
  flex: none;

  width: 100%;
  height: 100%;

  min-width: 200px;
  min-height: 200px;

  border: 1px solid red;

  background-image: ${({ src }) => `url(${src})`};
  // background-size: cover;
  background-size: contain;
  background-position: 50% 50%;
  background-repeat: no-repeat;
`;

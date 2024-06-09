import styled from 'styled-components';

export const Container = styled.div`
  position: relative;

  width: 100%;

  min-width: 200px;
  min-height: 200px;

  border: 1px solid #000;
  border-radius: 30px;

  overflow: hidden;
`;

export const Carousel = styled.div`
  display: flex;
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  height: auto;
`;

export const Image = styled.div<{ src: string }>`
  flex: none;

  width: 100%;
  height: 100%;

  min-width: 200px;
  min-height: 200px;

  background-image: ${({ src }) => `url(${src})`};
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;

  &:active {
    background-size: contain;
    background-position: 50% 50%;
  }
`;

export const CircleBtn = styled.div<{
  dir: string;
  disabled: boolean | string;
}>`
  position: absolute;
  margin-top: -32px;
  top: 50%;

  ${({ dir }) =>
    dir === 'right' ? 'rotate: 180deg; right: 24px;' : 'left: 24px'};

  width: 48px;
  height: 48px;

  display: flex;
  align-items: center;
  justify-content: center;

  border: 1px solid #000;
  border-radius: 32px;

  cursor: pointer;

  padding: 0 4px 0 0;

  z-index: 10;

  transition: 0.2s;
  background-color: rgba(255, 255, 255, 0.2);
  // opacity: ${({ disabled }) => (disabled ? '20%' : '100%')};

  &:hover {
    background-color: #fff;
    // opacity: ${({ disabled }) => (disabled ? '20%' : '80%')};
  }

`;

import { ReactNode, useEffect, useState } from 'react';
import styled from 'styled-components';

interface StyledProps {
  width?: string;
  height?: string;
  padding?: string;
  radius?: string;
  alignItems?: string;
  justify?: string;
}
interface PropsType {
  children: ReactNode;
  zIndex: number;
  innerStyles?: StyledProps;
  wrapStyles?: StyledProps;
  id: string;
  onClickClose: (id: string) => void;
}
const ModalContainer = (props: PropsType) => {
  const { zIndex, children, innerStyles, wrapStyles, onClickClose, id } = props;

  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    const clearTime = setTimeout(() => {
      setIsActive(true);
    }, 1);
    return () => {
      clearTimeout(clearTime);
    };
  }, []);

  //이벤트 전파 방지
  const stopPropagation = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation();
  };

  // 닫기 버튼 클릭
  const handleClickCloseButton = () => {
    setIsActive(false);
    setTimeout(() => {
      onClickClose(id);
    }, 500);
  };

  const styles = {
    ...innerStyles,
    ...wrapStyles,
    zIndex,
    isActive,
  };
  return (
    <Wrap {...styles} onClick={handleClickCloseButton}>
      <div onClick={(e) => stopPropagation(e)}>{children}</div>
    </Wrap>
  );
};

export default ModalContainer;

interface WrapStyledProps extends StyledProps {
  zIndex: number;
  isActive: boolean;
}
const Wrap = styled.div<WrapStyledProps>`
  position: fixed;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: ${({ zIndex }) => (zIndex ? zIndex * 10 : null)};
  opacity: 0;
  display: flex;
  align-items: ${({ alignItems }) => (alignItems ? alignItems : 'center')};
  justify-content: ${({ justify }) => (justify ? justify : 'center')};
  box-sizing: border-box;
  transition: opacity 0.6s;
  background: rgba(25, 25, 25, 0.5);
  padding: ${({ padding }) => (padding ? padding : '0')};

  & > div {
    width: ${({ width }) => (width ? width : '605px')};
    height: ${({ height }) => (height ? height : 'auto')};
    padding: ${({ padding }) => (padding ? padding : '0 ')};
    box-sizing: border-box;
    border-radius: ${({ radius }) => (radius ? radius : '30px')};
    transform: translateY(100px);
    transition: transform 0.6s;
    background-color: #fff;
  }

  ${({ isActive }) =>
    isActive &&
    `
  opacity: 1;
  transition: opacity 0.6s;
  & > div {
    transform: translateY(0);
  }
  `}
`;

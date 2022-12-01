import { ReactNode } from 'react';
import styled from 'styled-components';
import { ReactComponent as Arrow } from '../../../asset/arrowIcon.svg';

interface ButtonStyledProps {
  disabled?: boolean;
  color?: string;
  activeColor?: string;
  bg?: string;
  activeBg?: string;
  border?: string;
  width?: string;
  height?: string;
  padding?: string;
  radius?: string;
  isArrowIcon?: boolean;
  isFlex?: boolean;
}
interface PropsType extends ButtonStyledProps {
  children: ReactNode;
  _onClick: () => void;
  _disabled: boolean;
}
const Button = (props: PropsType) => {
  const {
    bg,
    color,
    activeColor,
    activeBg,
    children,
    _disabled,
    _onClick,
    border,
    width,
    height,
    padding,
    radius,
    isArrowIcon,
    isFlex,
  } = props;

  const styles = {
    bg,
    color,
    activeColor,
    activeBg,
    border,
    width,
    height,
    padding,
    radius,
    isFlex,
  };
  return (
    <StyledButton
      onClick={_onClick}
      {...styles}
      disabled={_disabled}
      isArrowIcon={isArrowIcon}
    >
      {children}
      {isArrowIcon ? (
        <span>
          <Arrow stroke="#333" strokeWidth="2" width="30" height="30" />
        </span>
      ) : null}
    </StyledButton>
  );
};

const StyledButton = styled.button<ButtonStyledProps>`
  box-sizing: border-box;
  width: ${({ width }) => (width ? width : '100%')};
  height: ${({ height }) => (height ? height : '50px')};
  padding: ${({ padding }) => (padding ? padding : '0')};
  background: ${({ disabled, bg, activeBg }) => (disabled ? bg : activeBg)};
  color: ${({ disabled, color, activeColor }) =>
    disabled ? color : activeColor};
  border-radius: ${({ radius }) => (radius ? radius : '0')};
  transition: background-color 0.15s ease-out;
  border: ${({ border }) => (border ? border : 'none')};
  ${({ isFlex }) =>
    isFlex &&
    `
    display:flex;
  justify-content: center;
  align-items: center;
  `}
  ${({ isArrowIcon }) =>
    isArrowIcon &&
    `
    display:flex;
    justify-contents:space-between;
    align-items:center;
  `}
`;
export default Button;

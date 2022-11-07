import { ReactNode } from "react";
import styled from "styled-components";
import { ReactComponent as Arrow } from "../../../asset/arrowIcon.svg";

interface ButtonPropsType {
  _disabled: boolean;
  color?: string;
  width?: string;
  height?: string;
  activeColor?: string;
  bg?: string;
  activeBg?: string;
  border?: string;
  padding?: string;
  children: ReactNode;
  radius?: string;
  _onClick: () => void;
  isArrowIcon?: boolean;
}
const Button = (props: ButtonPropsType) => {
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
          <Arrow stroke="#333" />
        </span>
      ) : null}
    </StyledButton>
  );
};

interface ButtonStyledProps {
  disabled: boolean;
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
}
const StyledButton = styled.button<ButtonStyledProps>`
  box-sizing: border-box;
  width: ${({ width }) => (width ? width : "100%")};
  height: ${({ height }) => (height ? height : "50px")};
  padding: ${({ padding }) => (padding ? padding : "0")};
  background: ${({ disabled, bg, activeBg }) => (disabled ? bg : activeBg)};
  color: ${({ disabled, color, activeColor }) =>
    disabled ? color : activeColor};
  border-radius: ${({ radius }) => (radius ? radius : "0")};
  transition: background-color 0.15s ease-out;
  border: ${({ border }) => (border ? border : "none")};

  ${({ isArrowIcon }) =>
    isArrowIcon &&
    `
    display:flex;
    justify-contents:space-between;
    align-items:center;
  `}
`;
export default Button;

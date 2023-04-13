import { ReactNode } from 'react';
import { ReactComponent as Arrow } from 'src/asset/arrowIcon.svg';
import styled from 'styled-components';

interface ButtonStyledProps {
  disabled?: boolean;
  color?: string;
  activeColor?: string;
  bg?: string;
  activeBg?: string;
  border?: string;
  width?: string;
  height?: string;
  margin?: string;
  padding?: string;
  radius?: string;
  isArrowIcon?: boolean;
  isFlex?: boolean;
  fontSize?: string;
  fontWeight?: string;
  size?: string;
  weight?: string;
  colors?: string;
  bgcolor?: string;
}
interface PropsType extends ButtonStyledProps {
  children: ReactNode;
  _onClick: () => void;
  _disabled?: boolean;
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
    margin,
    padding,
    radius,
    isArrowIcon,
    isFlex,
    fontSize,
    fontWeight,
    size,
    weight,
    colors,
    bgcolor,
  } = props;
  
  const styles = {
    bg,
    color,
    activeColor,
    activeBg,
    border,
    width,
    height,
    margin,
    padding,
    radius,
    isFlex,
    fontSize,
    fontWeight,
    size,
    weight,
    colors,
    bgcolor,
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
  transition: background-color 0.15s ease-out;

  margin: ${({ margin }) => (margin ? margin : '0')};
  padding: ${({ padding }) => (padding ? padding : '0')};
  
  width: ${({ width }) => (width ? width : '100%')};
  height: ${({ height }) => (height ? height : '50px')};
  
  font-size: ${({ theme, size, fontSize }) => (
    size?
      theme.fontSizes[size]
      : ( fontSize? fontSize : theme.fontSizes.large ))};

  font-weight: ${({ theme, weight, fontWeight }) => (
    weight ? 
      theme.fontWeights[weight] 
      : ( fontWeight? fontWeight : theme.fontWeights.regular ))};
  
  color: ${({ theme, disabled, colors, color, activeColor }) => (
    disabled?
      (colors? theme.colors[colors] : (color? color : theme.colors.gray70))
      : (activeColor? activeColor : (colors? theme.colors[colors] : theme.colors.default)))};

  background: ${({ theme, bgcolor, disabled, bg, activeBg }) => (
    disabled?
      (bgcolor? theme.colors[bgcolor] : (bg? bg : theme.colors.gray40))
      : (activeBg? activeBg : (bgcolor?  theme.colors[bgcolor] : theme.colors.white)))};
  
  border: ${({ border }) => (border ? border : 'none')};
  border-radius: ${({ radius }) => (radius ? radius : '0')};
  
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

import { ReactNode } from 'react';
import styled from 'styled-components';

interface StyledProps {
  fontSize?: string;
  fontWeight?: string;
  lineHeight?: string;
  isPreventDrag?: boolean;
  width?: string;
  isFlex?: string;
  height?: string;
  color?: string;
  margin?: string;
  padding?: string;
  cursor?: string;
  size?: string;
  weight?: string;
  colors?: string;
}
interface PropsType {
  textStyle?: StyledProps;
  children: ReactNode;
}
export const Text = (props: PropsType) => {
  const { textStyle, children } = props;
  return <TextWrap {...textStyle}>{children}</TextWrap>;
};

const TextWrap = styled.p<StyledProps>`
  margin: ${({ margin }) => (margin ? margin : '')};  
  padding: ${({ padding }) => (padding ? padding : '')};
  
  width: ${({ width }) => (width ? width : 'auto')};
  height: ${({ height }) => (height ? height : 'auto')};
  
  
  color: ${({ theme, color, colors }) => (
    // colors : theme color
    // color : props color
    colors?
      theme.colors[colors]
      : ( color? color : theme.colors.default ))};

  font-size: ${({ theme, size, fontSize }) => (
    // size : theme size
    // fontSize : props size
    size? 
      theme.fontSizes[size] 
      : ( fontSize? fontSize : theme.fontSizes.regular ))};

  font-weight: ${({ theme, weight, fontWeight }) => (
    // weight : theme weight
    // fontWeight : props weight
    weight? 
      theme.fontWeights[weight] 
      : ( fontWeight? fontWeight : theme.fontWeights.regular))};

  line-height: ${({ lineHeight }) => (lineHeight ? lineHeight : '')};
  word-break: break-all;
  white-space: pre-wrap;
  -moz-white-space: pre-wrap;
  
  cursor: ${({ cursor }) => (cursor ? cursor : '')};
  ${({ isPreventDrag, theme }) =>
  isPreventDrag && `${theme.dragStyles.preventDrag};`}
  ${({ isFlex }) =>
    isFlex &&
    `
		display: flex;
	align-items: center;
	justify-content: center;
	`}
`;

export default Text;
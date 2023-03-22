import { ReactNode } from 'react';
import styled from 'styled-components';

interface StyledProps {
  fontSize?: string;
  fontWeight?: string;
  lineHeight?: string;
  width?: string;
  isFlex?: string;
  height?: string;
  color?: string;
  margin?: string;
  padding?: string;
  cursor?: string;
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
  width: ${({ width }) => (width ? width : 'auto')};
  height: ${({ height }) => (height ? height : 'auto')};
  font-weight: ${({ fontWeight }) => (fontWeight ? fontWeight : '400')};
  font-size: ${({ fontSize }) => (fontSize ? fontSize : '14px')};
  color: ${({ color, theme }) => (color ? color : '#000')};
  padding: ${({ padding }) => (padding ? padding : '')};
  margin: ${({ margin }) => (margin ? margin : '')};
  cursor: ${({ cursor }) => (cursor ? cursor : '')};
  line-height: ${({ lineHeight }) => (lineHeight ? lineHeight : '')};
  word-break: break-all;
  white-space: pre-wrap;
  -moz-white-space: pre-wrap;
  ${({ isFlex }) =>
    isFlex &&
    `
		display: flex;
	align-items: center;
	justify-content: center;
	`}
`;

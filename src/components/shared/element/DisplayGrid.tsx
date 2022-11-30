import React, { ReactNode } from 'react';
import styled from 'styled-components';

interface StyledProps {
  width?: string;
  height: string;
  justify?: string;
  align?: string;
  flexDirection?: string;
  padding?: string;
  margin?: string;
  flexWrap?: string;
}
interface PropsType extends StyledProps {
  children?: ReactNode;
}
const DisplayGrid = (props: PropsType) => {
  const {
    children,
    width,
    height,
    justify,
    align,
    flexDirection,
    padding,
    flexWrap,
    margin,
  } = props;
  const styles = {
    width,
    height,
    justify,
    align,
    flexDirection,
    padding,
    flexWrap,
    margin,
  };
  return <DisplayBox {...styles}>{children}</DisplayBox>;
};

const DisplayBox = styled.div<StyledProps>`
  width: ${({ width }) => (width ? width : '100%')};
  height: ${({ height }) => height};
  padding: ${({ padding }) => (padding ? padding : '0')};
  margin: ${({ margin }) => (margin ? margin : '0')};
  display: flex;
  flex-wrap: ${({ flexWrap }) => (flexWrap ? flexWrap : 'nowrap')};
  justify-content: ${({ justify }) => (justify ? justify : 'space-between')};
  align-items: ${({ align }) => (align ? align : 'center')};
  flex-direction: ${({ flexDirection }) =>
    flexDirection ? flexDirection : 'row'};
`;
export default DisplayGrid;

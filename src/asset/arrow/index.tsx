import styled from 'styled-components';
import { ReactComponent as NorthIcon } from './northArrow.svg';

interface StyledProps {
  width?: string;
  height?: string;
  radius?: string;
  bg?: string;
  border?: string;
}
interface PropsType {
  wrapStyles?: StyledProps;
  iconStyles: {
    size: string;
    color: string;
  };
}
export const ArrowIcon = {
  North: (props: PropsType) => <North {...props} />,
};
const North = (props: PropsType) => {
  const { wrapStyles, iconStyles } = props;

  return (
    <CircleWrap {...wrapStyles}>
      <NorthIcon
        width={iconStyles.size}
        height={iconStyles.size}
        fill={iconStyles.color}
      />
    </CircleWrap>
  );
};
const CircleWrap = styled.div<StyledProps>`
  width: ${({ width }) => (width ? width : '65px')};
  height: ${({ height }) => (height ? height : '65px')};
  border-radius: ${({ radius }) => (radius ? radius : '65px')};
  background-color: ${({ bg }) => (bg ? bg : '#fff')};
  border: ${({ border }) => (border ? border : '1px solid #1A202C')};
  display: flex;
  align-items: center;
  justify-content: center;
`;

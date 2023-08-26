import { ChangeEventHandler, forwardRef, KeyboardEventHandler } from 'react';
import { Icon } from 'src/asset/icon/Index';
import styled from 'styled-components';

interface StyledProps {
  width?: string;
  height?: string;
  margin?: string;
  padding?: string;
  borderBottom?: string;
  bg?: string;
  color?: string;
}
interface PropsType {
  placeholder?: string;
  defaultValue?: string;
  onClick: () => void;
  onChange: ChangeEventHandler<HTMLInputElement>;
  onKeyUp: KeyboardEventHandler<HTMLInputElement>;
  name: string;
  maxLength?: number;
  inputStyles?: StyledProps;
  wrapStyles?: StyledProps;
}
export const SearchInput = forwardRef((props: PropsType, ref?: any) => {
  const {
    placeholder,
    defaultValue,
    onClick,
    onChange,
    onKeyUp,
    name,
    maxLength,
    inputStyles,
    wrapStyles,
  } = props;
  return (
    <Wrap {...wrapStyles}>
      <Input
        ref={ref}
        {...inputStyles}
        name={name}
        maxLength={maxLength}
        onChange={onChange}
        defaultValue={defaultValue || ''}
        onKeyUp={onKeyUp}
        placeholder={placeholder || '무엇을 찾고 계신가요?'}
      />
      <IconBox onClick={onClick}>
        <Icon.Search size="35" color="#000" />
      </IconBox>
    </Wrap>
  );
});

const Wrap = styled.div<StyledProps>`
  width: ${({ width }) => (width ? width : 'auto')};
  height: ${({ height }) => (height ? height : '70px')};
  margin: ${({ margin }) => (margin ? margin : '0')};
  padding: ${({ padding }) => (padding ? padding : '0')};
  position: relative;
`;
const Input = styled.input<StyledProps>`
  width: ${({ width }) => (width ? width : '100%')};
  height: ${({ height }) => (height ? height : '70px')};
  margin: ${({ margin }) => (margin ? margin : '0')};
  padding: ${({ padding }) => (padding ? padding : '20px 0')};
  color: ${({ color }) => (color ? color : '#000')};
  border: none;
  border-bottom: ${({ borderBottom }) =>
    borderBottom ? borderBottom : '2px solid #000000'};
  font-weight: 500;
  font-size: 20px;
  ::placeholder {
    font-weight: 500;
    font-size: 20px;
    color: rgba(0, 0, 0, 0.2);
    ${({ theme }) => theme.dragStyles.preventDrag};
  }
  :focus {
    outline: none;
    border-bottom: 2px solid ${({ theme }) => theme.colors.main};
  }
`;
const IconBox = styled.div`
  width: 35px;
  height: 35px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  right: 0;
  bottom: 18px;
`;

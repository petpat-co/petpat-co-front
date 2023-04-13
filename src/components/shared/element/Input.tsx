import { forwardRef } from 'react';
import styled from 'styled-components';

type InputStyleType = {
  width?: string; //기본 100%
  height?: string; //기본 50px
  border?: string; //기본  1.4px solid #aaaaaa;
  borderRadius?: string; //기본 0px
  isBorderBottom?: boolean;
};
interface InputProps extends InputStyleType {
  type?:string;
  placeholder: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  defaultValue?: string;
  maxLength: number;
  name: string;
  autoComplete?: boolean,
}
const Input = forwardRef((props: InputProps, ref?: any) => {
  const {
    type,
    placeholder,
    onChange,
    defaultValue,
    maxLength,
    width,
    height,
    border,
    name,
    borderRadius,
    isBorderBottom,
    autoComplete,
  } = props;

  const styles = {
    width,
    height,
    border,
    borderRadius,
    isBorderBottom,
  };

  return (
    <StyledInput
      {...styles}
      type={type}
      placeholder={placeholder}
      onChange={onChange}
      defaultValue={defaultValue}
      ref={ref}
      name={name}
      maxLength={maxLength}
      autoComplete={autoComplete?'on':'off'}
    />
  );
});

const StyledInput = styled.input<InputStyleType>`
  width: ${({ width }) => (width ? width : '100%')};
  height: ${({ height }) => (height ? height : '50px')};
  border: ${({ border }) => (border ? border : '1.4px solid #aaaaaa')};
  border-radius: ${({ borderRadius }) => (borderRadius ? borderRadius : '0')};
  padding: 10px;
  font-size: 20px;
  ::placeholder {
    color: #cdcdcd;
  }
  ::-webkit-input-placeholder {
    color: #cdcdcd;
  }
  :-ms-input-placeholder {
    color: #cdcdcd;
  }
  :focus {
    border: 1.4px solid #fbbc05;
    outline: none;
  }

  ${({ isBorderBottom }) =>
    isBorderBottom &&
    `
    border-bottom:1.4px solid #aaaaaa;
    :focus {
    border:none;
    border-bottom: 1.4px solid #fbbc05;
    outline: none;
  }
  `}
`;
export default Input;

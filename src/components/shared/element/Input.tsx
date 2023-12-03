import { forwardRef } from 'react';
import styled from 'styled-components';

type InputStyleType = {
  margin?: string; //기본 none
  width?: string; //기본 100%
  height?: string; //기본 50px
  border?: string; //기본  1.4px solid #aaaaaa;
  borderRadius?: string; //기본 0px
  isBorderBottom?: boolean;
  padding?: string;
};

interface InputProps extends InputStyleType {
  type?: string;
  placeholder: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  defaultValue?: string;
  maxLength: number;
  name: string;
  autoComplete?: boolean;
}
const Input = forwardRef((props: InputProps, ref?: any) => {
  const {
    type,
    placeholder,
    onChange,
    defaultValue,
    maxLength,
    margin,
    width,
    height,
    border,
    name,
    borderRadius,
    isBorderBottom,
    autoComplete,
    padding,
  } = props;

  const styles = {
    margin,
    width,
    height,
    border,
    borderRadius,
    isBorderBottom,
    padding,
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
      autoComplete={autoComplete ? 'on' : 'off'}
    />
  );
});

const StyledInput = styled.input<InputStyleType>`
  margin: ${({ margin }) => (margin ? margin : 'none')};
  width: ${({ width }) => (width ? width : '100%')};
  height: ${({ height }) => (height ? height : '50px')};
  border: ${({ border, theme }) =>
    border ? border : `1.4px solid ${theme.colors.primary}`};
  border-radius: ${({ borderRadius }) => (borderRadius ? borderRadius : '0')};
  padding: ${({ padding }) => (padding ? padding : '10px')};
  font-size: ${({ theme }) => theme.fontSizes.regular};
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
    // border: ${({ theme }) => `1.4px solid ${theme.colors.coolgray400}`};
    outline: none;
  }

  ${({ type, theme }) =>
    type === 'checkbox'
      ? `appearance: none;
    width: 1.5rem;
    height: 1.5rem;
    border: 1.5px solid ${theme.colors.primary};
    border-radius: 0.35rem;
    
    &:checked {
      border-color: transparent;
      background-image: url("data:image/svg+xml,%3csvg viewBox='0 0 16 16' fill='white' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M5.707 7.293a1 1 0 0 0-1.414 1.414l2 2a1 1 0 0 0 1.414 0l4-4a1 1 0 0 0-1.414-1.414L7 8.586 5.707 7.293z'/%3e%3c/svg%3e");
      background-size: 100% 100%;
      background-position: 50%;
      background-repeat: no-repeat;
      background-color: ${theme.colors.primary};
    }
    
    `
      : type === 'radio' &&
        `appearance: none;
    width: 1.5rem;
    height: 1.5rem;
    border: 1.5px solid ${theme.colors.primary};
    border-radius: 0.35rem;
    
    &:checked {
      border-color: transparent;
      background-image: url("data:image/svg+xml,%3csvg viewBox='0 0 16 16' fill='white' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M5.707 7.293a1 1 0 0 0-1.414 1.414l2 2a1 1 0 0 0 1.414 0l4-4a1 1 0 0 0-1.414-1.414L7 8.586 5.707 7.293z'/%3e%3c/svg%3e");
      background-size: 100% 100%;
      background-position: 50%;
      background-repeat: no-repeat;
      background-color: ${theme.colors.primary};
    }
    
    `};

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

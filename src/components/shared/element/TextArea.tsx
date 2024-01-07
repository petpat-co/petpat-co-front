import { ChangeEvent, forwardRef } from 'react';
import styled from 'styled-components';
import theme from '../../../styles/theme';

type TextAreaStyleType = {
  width?: string; //기본 100%
  height: string;
  border?: string; //기본  1.4px solid #aaaaaa;
  borderRadius?: string; //기본 0px
  padding?: string;
  fontSize?: string;
};
interface TextAreaProps extends TextAreaStyleType {
  placeholder: string;
  onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  defaultValue?: string;
  maxLength: number;
  name: string;
}
const TextArea = forwardRef((props: TextAreaProps, ref?: any) => {
  const {
    placeholder,
    onChange,
    defaultValue,
    maxLength,
    width,
    height,
    border,
    name,
    borderRadius,
    padding,
    fontSize,
  } = props;

  const styles = {
    width,
    height,
    border,
    borderRadius,
    padding,
    fontSize,
  };

  return (
    <StyledTextArea
      {...styles}
      placeholder={placeholder}
      onChange={onChange}
      defaultValue={defaultValue}
      ref={ref}
      name={name}
      maxLength={maxLength}
    />
  );
});

const StyledTextArea = styled.textarea<TextAreaStyleType>`
  padding: ${({ padding }) => (padding ? padding : '0')};
  width: ${({ width }) => (width ? width : '100%')};
  height: ${({ height }) => height};
  border: ${({ border, theme }) =>
    border ? border : `1.4px solid ${theme.colors.primary}`};
  border-radius: ${({ borderRadius }) => (borderRadius ? borderRadius : '0')};
  font-size: ${({ fontSize }) =>
    fontSize ? fontSize : `${theme.fontSizes.large}`};
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
    border: ${({ theme }) => `1.4px solid ${theme.colors.coolgray400}`};
    outline: none;
  }
`;
export default TextArea;

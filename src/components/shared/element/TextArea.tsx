import { ChangeEvent, forwardRef } from 'react';
import styled from 'styled-components';

type TextAreaStyleType = {
  width?: string; //기본 100%
  height: string;
  border?: string; //기본  1.4px solid #aaaaaa;
  borderRadius?: string; //기본 0px
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
  } = props;

  const styles = {
    width,
    height,
    border,
    borderRadius,
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
  width: ${({ width }) => (width ? width : '100%')};
  height: ${({ height }) => height};
  border: ${({ border }) => (border ? border : '1.4px solid #aaaaaa')};
  border-radius: ${({ borderRadius }) => (borderRadius ? borderRadius : '0')};
  padding: 10px;
  font-size: ${({ theme }) => ( theme.fontSizes.large )};
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
`;
export default TextArea;

// ** Import react
import React from 'react';

// ** Import lib
import styled from 'styled-components';

// ** Import utils
import theme from '../../styles/theme';

// ** Import svg
import { ReactComponent as WarningIcon } from '../../asset/postIcon/warningIcon.svg';

type ErrorMessageProps = {
  top: number;
  message: string;
};

const InputErrorMessage = ({ top, message }: ErrorMessageProps) => {
  return (
    <ComponentContainer top={top}>
      <WarningIcon width="16px" height="16px" />
      <ErrorText>{message}</ErrorText>
    </ComponentContainer>
  );
};

const ComponentContainer = styled.div<{ top: number }>`
  position: absolute;
  padding: 0 10px 0 10px;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 6px;
  top: ${(props) => props.top}px;
`;

const ErrorText = styled.p`
  font-size: ${theme.fontSizes.small};
  font-weight: ${theme.fontWeights.regular};
  color: ${theme.colors.primary};
`;

export default InputErrorMessage;

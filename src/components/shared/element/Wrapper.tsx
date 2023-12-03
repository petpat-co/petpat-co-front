import { ReactNode } from 'react';
import styled from 'styled-components';

interface PropsType {
  children: ReactNode;
}
const Wrapper = (props: PropsType) => {
  const { children } = props;
  return <Wrap>{children}</Wrap>;
};

export default Wrapper;

const Wrap = styled.div`
  // width: 1920px;
  width: 100%;
  height: auto;
  margin: 0 auto;
  position: relative;
  @media ${({ theme }) => theme.device.web} {
    width: 100%;
  }
`;

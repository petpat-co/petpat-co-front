import { ReactNode } from 'react';
import styled from 'styled-components';

interface PropsType {
  children: ReactNode;
}
const TopSection = (props: PropsType) => {
  const { children } = props;
  return (
    <Wrapper>
      <TopSectionWrap>{children}</TopSectionWrap>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
  height: 126px;
  background: ${({ theme }) => theme.colors.primary};
`;

const TopSectionWrap = styled.div`
  margin: 278px auto 0 auto;
  width: 100%;
  max-width: 1440px;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  @media ${({ theme }) => theme.device.web} {
    width: 100%;
  }
`;

export default TopSection;

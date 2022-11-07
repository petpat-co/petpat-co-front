import styled from "styled-components";

export const TopSectionWrap = styled.div`
  width: 1200px;
  height: 150px;
  margin: 0 auto;
  background: #d9d9d9;
  border-radius: 14px;
  display: flex;
  align-items: center;
  padding: 45px;
  justify-content: space-between;
  margin-top: 70px;
  @media ${({ theme }) => theme.device.web} {
    width: 100%;
  }
`;

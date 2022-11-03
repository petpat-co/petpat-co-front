import styled from "styled-components";

export const CardBox = styled.div<{ height: string; margin?: string }>`
  width: 1200px;
  height: ${(props) => props.height};
  margin: ${(props) => (props.margin ? `${props.margin}` : "0 auto")};
  display: flex;
  justify-content: space-between;
`;
export const Text = styled.p`
  font-weight: 700;
  font-size: 26px;
`;

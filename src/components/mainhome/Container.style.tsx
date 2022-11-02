import styled from "styled-components";

interface BoxType {
  width?: string;
  height?: string;
  display?: string;
  justifyContent?: string;
}

export const Container = styled.div<BoxType>`
  width: ${(props) => (props.width ? `${props.width}` : "1200px")};
  height: ${(props) => (props.height ? `${props.height}` : "420px")};
  margin: 0 auto;
  display: ${(props) => (props.display ? `${props.display}` : null)};
  justify-content: ${(props) =>
    props.justifyContent ? `${props.justifyContent}` : null};
`;

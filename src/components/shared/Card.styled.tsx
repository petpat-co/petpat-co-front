import styled from "styled-components";

interface CardType {
  width?: string;
  height?: string;
  margin?: string;
  display?: string;
  fontSize?: string;
  textAlign?: string;
  fontWeight?: number;
  color?: string;
}

export const Container = styled.div<CardType>`
  width: ${(props) => (props.width ? `${props.width}` : "285px")};
  height: ${(props) => (props.height ? `${props.height}` : "420px")};
  display: ${(props) => (props.display ? `${props.display}` : null)};
`;

export const Img = styled.img`
  width: 285px;
  height: 285px;
  border: 1px solid red;
  border-radius: 14px;
  &:hover {
    cursor: pointer;
  }
`;

export const Text = styled.p<CardType>`
  width: ${(props) => (props.width ? `${props.width}` : "100%")};
  color: ${(props) => (props.color ? `${props.color}` : "black")};
  font-weight: ${(props) => (props.fontWeight ? `${props.fontWeight}` : "400")};
  font-size: ${(props) => (props.fontSize ? `${props.fontSize}` : "22px")};
  margin: ${(props) => (props.margin ? `${props.margin}` : "14px 0")};
  text-align: ${(props) => (props.textAlign ? `${props.textAlign}` : null)};
  &:hover {
    cursor: pointer;
  }
`;

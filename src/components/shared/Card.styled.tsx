import styled from "styled-components";

interface CardType {
  width?: string;
  height?: string;
  fontSize?: string;
  textAlign?: string;
  display?: string;
}

export const CardWrap = styled.div`
  width: 285px;
  height: 420px;
`;

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

export const Text = styled.p<{ fontWeight?: number }>`
  width: 100%;
  font-weight: ${(props) => (props.fontWeight ? `${props.fontWeight}` : "400")};
  font-size: 22px;
  margin: 14px 0;
`;

export const smallText = styled.p<CardType>`
  width: ${(props) => (props.width ? `${props.width}` : "38%")};
  font-size: ${(props) => (props.fontSize ? `${props.fontSize}` : "16px")};
  text-align: ${(props) => (props.textAlign ? `${props.textAlign}` : null)};
  color: ${(props) => (props.color ? `${props.color}` : "black")};
`;

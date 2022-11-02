import React from "react";
import Card from "../shared/Card";
import * as S from "./Container.style";

const CardList = () => {
  const test: number[] = [1, 2, 3, 4];

  return (
    <S.CardBox>
      {test.map((el, idx) => (
        <Card key={idx} />
      ))}
    </S.CardBox>
  );
};

export default CardList;

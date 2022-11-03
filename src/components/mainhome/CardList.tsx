import Card from "../shared/Card";
import * as S from "./CardList.styled";
import { ReactComponent as Arrow } from "../../asset/arrowIcon.svg";

const CardList = () => {
  const test: number[] = [1, 2, 3, 4];

  return (
    <>
      <S.CardBox height="40px" margin="0 auto 40px auto">
        <S.Text>텍스트들어갈자리</S.Text>
        <Arrow />
      </S.CardBox>
      <S.CardBox height="420px">
        {test.map((el, idx) => (
          <Card key={idx} />
        ))}
      </S.CardBox>
    </>
  );
};

export default CardList;

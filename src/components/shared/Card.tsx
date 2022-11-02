import React from "react";
import * as S from "./Card.styled";
import { ReactComponent as View } from "../../asset/viewIcon.svg";
import { ReactComponent as Comment } from "../../asset/commentIcon.svg";

const Card = () => {
  return (
    <S.Container>
      <S.Img />
      <S.Text fontWeight={700}>모집 중</S.Text>
      <S.Text>우리집 댕댕이가 새끼를 낳..</S.Text>
      <S.Container height="30px" display="flex">
        <S.Text width="54%" fontSize="18px" margin="0">
          댕댕이 집사
        </S.Text>
        <S.Container width="46%" height="30px" display="flex">
          <View />
          <S.Text
            width="38%"
            fontSize="16px"
            margin="0"
            textAlign="center"
            color="#d9d9d9"
          >
            1000
          </S.Text>
          <Comment />
          <S.Text
            width="38%"
            fontSize="16px"
            margin="0"
            textAlign="center"
            color="#d9d9d9"
          >
            1000
          </S.Text>
        </S.Container>
      </S.Container>
    </S.Container>
  );
};

export default Card;

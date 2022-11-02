import React from "react";
import * as S from "./Card.styled";
import { ReactComponent as View } from "../../asset/viewIcon.svg";
import { ReactComponent as Comment } from "../../asset/commentIcon.svg";

const Card = () => {
  return (
    <S.CardWrap>
      <S.Img />
      <S.Text fontWeight={700}>모집 중</S.Text>
      <S.Text>우리집 댕댕이가 새끼를 낳..</S.Text>
      <S.Container height="30px" display="flex">
        <S.smallText width="54%" fontSize="18px">
          댕댕이 집사
        </S.smallText>
        <S.Container width="46%" height="30px" display="flex">
          <View />
          <S.smallText textAlign="center" color="#d9d9d9">
            1000
          </S.smallText>
          <Comment />
          <S.smallText textAlign="center" color="#d9d9d9">
            1000
          </S.smallText>
        </S.Container>
      </S.Container>
    </S.CardWrap>
  );
};

export default Card;

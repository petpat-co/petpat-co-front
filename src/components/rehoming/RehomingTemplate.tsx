import { ReactElement } from "react";
import * as S from "./RehomingTemplate.style";
import Button from "../shared/element/Button";
import TopSection from "../shared/layout/TopSection";

const RehomingTemplate = (): ReactElement => {
  return (
    <>
      <TopSection>
        <S.TitleText>분양글 게시판</S.TitleText>
        <Button
          width="auto"
          border="2px solid #2b2b2b"
          isArrowIcon={true}
          _onClick={() => {}}
          _disabled={false}
          activeBg="#fff"
          padding="0 20px"
          radius="120px"
        >
          <S.ButtonSpan> 분양 글쓰러가기</S.ButtonSpan>
        </Button>
      </TopSection>
    </>
  );
};

export default RehomingTemplate;

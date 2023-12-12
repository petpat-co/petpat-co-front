import React, { ReactElement } from 'react';
import BoardTemplate from '../shared/board/BoardTemplate';

const GoodsTradeTemplate = (): ReactElement => {
  return (
    <BoardTemplate
      title={'물품거래 게시판'}
      buttonText={'물품글 올리기'}
      onClick={() => console.log('글쓰기 페이지 이동')}
      bannerTitle={
        <>
          이번주에 관심
          <br />
          많이 받은 물품들
        </>
      }
      bannerContent={
        <>
          다른 물품 둘러보기 전에
          <br />
          관심 많이 받은 게시글도 한 번 보고 가세요!
        </>
      }
    />
  );
};

export default GoodsTradeTemplate;

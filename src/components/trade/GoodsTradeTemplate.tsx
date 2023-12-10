import {ReactElement} from "react";
import BoardTemplate from "../shared/board/BoardTemplate";

const GoodsTradeTemplate = (): ReactElement => {
    return <BoardTemplate title={'물품거래 게시판'} buttonText={'물품글 올리기'} onClick={() => console.log('글쓰기 페이지 이동')}/>;
};

export default GoodsTradeTemplate;

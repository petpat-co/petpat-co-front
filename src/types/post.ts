export namespace Post {
  export namespace Payload {}

  export interface Store {}

  export interface Qna {
    qnaImage: Array<string>;
    postId: string;
    postType: string;
    title: string;
    username: string;
    description: string;
    createdAt: string;
    updatedAt: string;
    isBookmark: boolean | string;
    isCompleted: boolean | string;
    viewCount: string;
    bookMark: string;
  }

  export interface QnaState {
    list: Array<string>;
    post: Qna;
    isSuccess: boolean;
  }


  export interface Rehoming {
    bookmarkCnt: number,
    bookmarked: false,
    category: string,
    cityCountryName: string,
    cityName: string,
    createdAt: string,
    description: string,
    detailAdName: string,
    fullAdName: string,
    gender: string,
    likeCnt: number,
    liked: false,
    nickname: string,
    petAge: string,
    petName: string,
    postType: string,
    rehomingId: number,
    rehomingImg: Array<string>,
    status: string,
    title: string,
    townShipName: string,
    type: string,
    updatedAt: string,
    userId: number,
    viewCnt: number,
  }


  export interface RehomingState {
    category: Array<string>;
    list: Array<string>;
    post: Rehoming;
    onError: boolean;
  }
  
  // 게시판 관련 공통으로 쓰이는 프로퍼티 타입 정의
  export interface Common {
    id: number;
    title: string;
    viewCnt: number;
    postType: string;
  }

  // 분양, 물품 관련 공통으로 쓰이는 프로퍼티 타입 정의 (rehome, trade)
  export interface BoardList extends Common {
    region: string;
    imagePath: string;
    liked: boolean;
    status: number; // 0:진행중 1:예약중 2:완료
    price?: number;
  }

  // trade > 리덕스 state 타입 정의
  export interface TradeState {
    list: Array<BoardList>;
    isSuccess: boolean;
  }
}

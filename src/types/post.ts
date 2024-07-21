export namespace Post {
  export namespace Payload {}

  export interface Store {}

  // TODO: 사용 여부 및 리팩토링 여부 확인 필요
  export interface PostState {
    rehome: Rehoming;
    trade: Trade;
    qna: Qna;
    onGetPostError: boolean;
    onAddPostError: boolean;
    onDeleteError: boolean;
    error: string; // error 메시지
  }

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
    onGetPostError: boolean; // 게시글 조회 실패 에러
    onPostQnaError: boolean; // 게시글 삭제 상태
  }

  export interface Rehoming {
    // user
    userId?: number | string; // 작성자 번호
    image?: string; // 작성자 이미지(추후 변수명 변경 필요)
    nickname?: string; // 작성자 닉네임

    // post info
    postType?: string; // 글 타입 (서버에서 내려온 postType - 분양, 거래...)
    rehomingId?: number | string; // 글 번호(분양)
    postId?: number | string; // 글 번호(예비용)

    // post content
    title?: string; // 글 제목
    description?: string; // 상세설명(분양)
    content?: string; // 상세설명(거래)
    createdAt?: string; // 글 작성일
    updatedAt?: string; // 글 수정일

    // post status
    status?: string; // 분양/판매 상태 (ex_TRADE_FINDING...)
    liked?: boolean; // 좋아요 상태
    likeCnt?: number | string; // 좋아요 수
    bookmarked?: boolean; // 북마크 상태
    bookmarkCnt?: number | string; // 북마크 수
    viewCnt?: number | string; // 조회수

    // image
    imageList?: Array<string>;

    // address
    cityName?: string; // 도,시
    townShipName?: string; // 동
    cityCountryName?: string; // 구
    detailAdName?: string; // 상세주소
    fullAdName?: string; // 상세주소의 상세주소(?)
    region?: string; // 주소 한번에 내려주는 방식으로 변경 예정

    // rehoming
    category?: string; // 동물 타입 (ex_ 강아지, 고양이...)
    type?: string; // 동물 하위타입 (ex_ 시츄, 포메라니안...)
    petName?: string; // 지어준 동물 이름
    petAge?: string; // 동물 생년월일 (ex_2024-01-01)
    gender?: string; // 동물 성별
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
    postId: number;
    region: string;
    imagePath: string;
    liked: boolean;
    status: string; // 0:진행중 1:예약중 2:완료
    price?: number; // trade만 표시
  }

  // 게시판 목록 페이지 컴포넌트화 > 타입 신규 정의 == ListCard 컴포넌트에서 사용되는 타입(개별)
  export interface InfoState {
    postId: number;
    title: string;
    viewCnt: number;
    postType: string;
    region: string;
    imagePath: string;
    liked: boolean;
    status: string;
    price?: number; // trade만 표시
  }

  // 게시판 목록 페이지 컴포넌트화 > 타입 신규 정의 == ListTemplate 컴포넌트에서 사용되는 타입(목록)
  export interface ListState {
    category: Array<string>;
    list: Array<InfoState>;
    banner: Array<InfoState>;
    post: InfoState;
    pageInfo: any;
    onError: boolean;
  }

  // trade > 리덕스 state 타입 정의
  export interface TradeState {
    category: Array<string>;
    list: Array<string>;
    post: Trade;
    onError: boolean;
  }

  export interface Trade {
    // user
    userId?: number | string; // 작성자 번호
    image?: string; // 작성자 이미지(추후 변수명 변경 필요)
    nickname?: string; // 작성자 닉네임

    // post info
    postType?: string; // 글 타입 (서버에서 내려온 postType - 분양, 거래...)
    tradeId?: number | string; // 글 번호(거래)
    postId?: number | string; // 글 번호(예비용)

    // post content
    title?: string; // 글 제목
    description?: string; // 상세설명(분양)
    content?: string; // 상세설명(거래)
    createdAt?: string; // 글 작성일

    // post status
    status?: string; // 분양/판매 상태 (ex_TRADE_FINDING...)
    liked?: boolean; // 좋아요 상태
    likeCnt?: number | string; // 좋아요 수
    bookmarked?: boolean; // 북마크 상태
    bookmarkCnt?: number | string; // 북마크 수
    viewCnt?: number | string; // 조회수

    // image - 추후 사용되지 않는 변수 삭제 필요
    tradeImg?: Array<string>;
    images?: Array<string>;
    imageList?: Array<string>;
    profileImg?: string; // 작성자 프로필 이미지

    // address
    cityName?: string; // 도,시
    townShipName?: string; // 동
    cityCountryName?: string; // 구
    detailAdName?: string; // 상세주소
    region?: string; // 주소 한번에 내려주는 방식으로 변경 예정

    // trade
    price?: number | string; // 가격
    tradeCategoryDetailName?: string; // 거래 물품 이름
  }

  export interface Post {
    // user
    userId?: number | string; // 작성자 번호
    image?: string; // 작성자 이미지(추후 변수명 변경 필요)
    nickname?: string; // 작성자 닉네임

    // post info
    postType?: string; // 글 타입 (서버에서 내려온 postType - 분양, 거래...)
    rehomingId?: number | string; // 글 번호(분양)
    tradeId?: number | string; // 글 번호(거래)
    qnaId?: number | string; // 글 번호(qna)
    postId?: number | string; // 글 번호(예비용)

    // post content
    title?: string; // 글 제목
    description?: string; // 상세설명(분양)
    content?: string; // 상세설명(거래)
    createdAt?: string; // 글 작성일
    updatedAt?: string; // 글 수정일

    // post status
    status?: string; // 분양/판매 상태 (ex_TRADE_FINDING...)
    liked?: boolean; // 좋아요 상태
    likeCnt?: number | string; // 좋아요 수
    bookmarked?: boolean; // 북마크 상태
    bookmarkCnt?: number | string; // 북마크 수
    viewCnt?: number | string; // 조회수

    // image - 추후 사용되지 않는 변수 삭제 필요
    rehomingImg?: Array<string>;
    tradeImg?: Array<string>;
    qnaImg?: Array<string>;
    images?: Array<string>;
    imageList?: Array<string>;

    // address
    cityName?: string; // 도,시
    townShipName?: string; // 동
    cityCountryName?: string; // 구
    detailAdName?: string; // 상세주소
    fullAdName?: string; // 진.짜.상.세.주.소...!
    region?: string; // 주소 한번에 내려주는 방식으로 변경 예정

    // rehoming
    category?: string; // 동물 타입 (ex_ 강아지, 고양이...)
    type?: string; // 동물 하위타입 (ex_ 시츄, 포메라니안...)
    petName?: string; // 지어준 동물 이름
    petAge?: string; // 동물 생년월일 (ex_2024-01-01)
    gender?: string; // 동물 성별
    neutralized?: boolean; // 중성화 여부
    // 감염병
    kennelCough?: boolean; // 켄넬코프
    rabies?: boolean;
    covidEnteritis?: boolean;
    fpv?: boolean;
    dhppl?: boolean;
    felv?: boolean;
    comprehensiveVaccine?: boolean;
    influenza?: boolean;

    // trade
    price?: number | string; // 가격
    tradeCategoryDetailName?: string; // 거래 물품 이름
  }
}

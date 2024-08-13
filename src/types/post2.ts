import { Category } from './category';

export namespace Post2 {
  // 게시글 공통
  export interface Common {
    postId: number; // 글 번호
    postType: string; // 글 유형
    title: string; // 글 제목
    description: string; // 글 설명
    imageList: Array<string>; // 글 이미지 목록
    viewCnt: number; // 글 조회 수
    isBookmarked: boolean; // 글 북마크 여부
    createdAt: string; // 글 작성일
    updatedAt: string; // 글 수정일
    userId: number; // 작성자 번호
    nickname: string; // 작성자 닉네임
    profileImg: string; // 작성자 이미지
  }

  // 메인 게시글 공통 (분양/거래)
  export interface MainPost extends Common {
    // TODO: 주소별 분리해서 전달 요청
    province: string; // 지역
    city?: string; // 시,군
    district?: string; // 구
    town: string; // 동,면,리
    // region: string; // 전체주소
    category: string; // 카테고리 (ex_강아지-ㅅ- 시츄 / 고양이-고양이 사료-건식사료)
    status: string; // 분양, 판매 상태
    isLiked: boolean; // 글 좋아요 여부
    likeCnt: number; // 글 좋아요 수
    bookmarkCnt?: number; // 글 북마크 수
  }

  // 분양 게시글 타입
  export interface Rehoming extends MainPost {
    petName: string; // 동물 이름
    petAge: string; // 동물 생년월일 (ex_2024-01-01)
    gender: string; // 동물 성별
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
  }

  // 물품 게시글 타입
  export interface Trade extends MainPost {
    price: number;
  }

  // 질문 게시글 타입
  export interface Qna extends Common {
    isCompleted?: boolean; // 답변 완료 여부
    bookmark?: string; // TODO: isBookmarked와 동일한 역할로 추후 삭제 예정
  }

  // 페이지 정보 타입
  export type Page = {
    totalPage: number;
    pageNo: number;
  };

  // 게시글 목록 state 타입 정의
  export interface PostListState {
    list: Array<Rehoming> | Array<Trade> | Array<Qna>;
    category?: Array<Category.Category>; // Qna 제외
    banner?: Array<Rehoming> | Array<Trade>;
    pageInfo: Page;
  }

  // 게시글 단일 state 타입 정의
  export interface PostDetailState {
    post: Rehoming | Trade | Qna;
    onGetPostError: boolean;
    onAddPostError: boolean;
    onDeleteError: boolean;
    onError: boolean; // TODO: 에러 관련 통합 프로퍼티 (이관 후 개별 프로퍼티는 삭제 예정)
    errorMessage: string;
  }
}

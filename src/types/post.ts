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
}

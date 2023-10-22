import React from 'react';
import * as S from './QnaDetail.style';
import { ReactComponent as BookMark } from '../../asset/bookmark.svg';
import { ReactComponent as Heart } from '../../asset/heart.svg';
import { ReactComponent as ViewCount } from '../../asset/postIcon/viewcount.svg';
import { ReactComponent as CommentCount } from '../../asset/postIcon/chatbubble.svg';
import { ReactComponent as Arrow } from '../../asset/arrow.svg';
import QnaCommentItem from './QnaCommentItem';
import format from 'date-fns/format';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from '../shared/element';
import { useAppDispatch } from 'src/core/store';
import {
  deleteQnaApi,
  getQnaDetailApi,
  modifyQnaApi,
} from 'src/core/redux/post/qnaSlice';
import { useSelector } from 'react-redux';

const QnaDetail = (): React.ReactElement => {
  const navigate = useNavigate();
  const appdispatch = useAppDispatch();
  const postId = useLocation().pathname.split('/')[3];

  const [sort, setSort] = React.useState('oldest');

  const content = useSelector((state: any) => state.qna.post);
  // const content = {
  //   postId: 4,
  //   postType: 'qna',
  //   userImgUrl:
  //     'https://i.namu.wiki/i/EqaWibSd8fXIWc5k5n1jyx3hzjq6Mg7QMMcxy1P-OMQrz7yxExPyDazwEfqL6-b2INTYVlZ65Qlxokf8T185Lw.webp',
  //   title: '자꾸 다른 강아지를 보면 짖어요',
  //   username: '오애렁',
  //   description:
  //     '한 달 전부터 산책을 나가면 \r\n자꾸 다른 강아지를 보고 짖어서 \r\n매번 마음편히 산책을 나갈 수가 없어요,, \r\n 왜 그러는 걸까요? \r\n도움 부탁드려요ㅠ',
  //   createdAt: '2022-09-31 12:00:00',
  //   updatedAt: '2022-09-31 12:00:00',
  //   isCompleted: false,
  //   isBookmark: true,
  //   viewCount: 10,
  //   bookMark: 3,
  // };

  const postContent = (str: string) => {
    str = str.replace(/\r\n/gi, '<br />');
    str = str.replace(/\\n/gi, '<br />');
    str = str.replace(/\n/gi, '<br />');
    return str;
  };

  const comments = [
    {
      userImgUrl:
        'https://d2v5dzhdg4zhx3.cloudfront.net/web-assets/images/storypages/short/linkedin-profile-picture-maker/dummy_image/thumb/004.webp',
      username: '유나룽',
      commentContent:
        '댓글내용댓글내용댓글내용댓글내용댓글내용댓글내용댓글내용댓글내용댓글내용댓글내용댓글내용댓글내용댓글내용',
      createdAt: '2022-09-31 12:00:00',
      updatedAt: '2022-09-31 12:00:00',
    },
    {
      userImgUrl:
        'https://m.media-amazon.com/images/I/91aC52nu6zL._AC_UF894,1000_QL80_.jpg',
      username: 'username',
      commentContent: 'commentContent',
      createdAt: '2022-09-31 12:00:00',
      updatedAt: '2022-09-31 12:00:00',
    },
  ];

  const goToList = () => {
    navigate('/qna');
  };

  const postModify = () => {
    navigate(`/qna/modify/${postId}`);
  };

  const postDelete = () => {
    appdispatch(deleteQnaApi(postId));
  };

  React.useEffect(() => {
    appdispatch(getQnaDetailApi(postId));
  }, []);

  return (
    <React.Fragment>
      <S.Container>
        <S.MainInfoSection>
          <S.ImageBox>
            <S.Image />
          </S.ImageBox>
          <S.Info>
            <S.ProfileBox src={content.userImgUrl}>
              <div className="qna_profile__image" />
              <p>{content.username}</p>
            </S.ProfileBox>
            <S.TitleSection>
              <p className="qna_detail__title">{content.title}</p>
              <S.IconBox>
                <Heart />
                <BookMark color={content.isBookmark ? '#F35F4C' : ''} />
              </S.IconBox>
            </S.TitleSection>
            <S.IconBox>
              <div>
                <ViewCount stroke="#d9d9d9" />
                <p className="qna_detail__count">{content.viewCount}</p>
                <CommentCount fill="#d9d9d9" />
                <p className="qna_detail__count">{content.bookMark}</p>
              </div>
            </S.IconBox>
            <S.ContentBox>
              <p className="qna_detail__content">
                {postContent(content.description)
                  .split('<br />')
                  .map((line: any, idx: number) => {
                    return (
                      <span key={idx}>
                        {line}
                        <br />
                      </span>
                    );
                  })}
              </p>
            </S.ContentBox>
            <S.MngButtons>
              <Button
                _onClick={() => {
                  postModify();
                }}
              >
                수정하기
              </Button>
              <Button
                _onClick={() => {
                  postDelete();
                }}
              >
                삭제하기
              </Button>
            </S.MngButtons>
          </S.Info>
        </S.MainInfoSection>
        <S.CommentSection>
          <S.CommentTitleBox selected={sort}>
            <p className="qna_detail_commentTitle">댓글</p>
            <p
              className="qna_detail_select__old"
              onClick={() => {
                setSort('oldest');
              }}
            >
              등록순
            </p>
            <p
              className="qna_detail_select__new"
              onClick={() => {
                setSort('newest');
              }}
            >
              최신순
            </p>
          </S.CommentTitleBox>
          {comments.map((comment, idx) => {
            const date = format(new Date(comment.createdAt), 'yy.MM.dd HH:mm');
            return (
              <QnaCommentItem
                key={idx}
                username={comment.username}
                userImgUrl={comment.userImgUrl}
                commentContent={comment.commentContent}
                createdAt={date}
              />
            );
          })}
          <S.CommentWrite>
            <p className="qna_comment_write__username">코멘트작성자</p>
            <textarea
              className="qna_comment_write__textarea"
              placeholder="댓글을 남겨보세요"
            />
            <p className="qna_comment_write__submit">등록</p>
          </S.CommentWrite>
          <hr />
        </S.CommentSection>
        <S.Buttons>
          <button className="qna_detail_button__list" onClick={goToList}>
            목록
          </button>
          <button className="qna_detail_button__top">
            <Arrow className="qna_detail_icon__arrow" />
            맨위로
          </button>
        </S.Buttons>
      </S.Container>
    </React.Fragment>
  );
};

export default QnaDetail;

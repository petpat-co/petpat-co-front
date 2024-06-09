import React from 'react';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAppDispatch } from 'src/core/store';

// style
import * as S from './ReHomingDetailTemplate.style';

// util
import format from 'date-fns/format';

// icon svg -> component
import { ReactComponent as BookMark } from '../../../asset/bookmark.svg';
import { ReactComponent as Heart } from '../../../asset/heart.svg';
import { ReactComponent as ViewCount } from '../../../asset/postIcon/viewcount.svg';
import { ReactComponent as CommentCount } from '../../../asset/postIcon/chatbubble.svg';
import { ReactComponent as Arrow } from '../../../asset/arrow.svg';
import { ReactComponent as LocationIcon } from '../../../asset/postIcon/location.svg';
import { ReactComponent as ModalIcon } from '../../../asset/modalicon/sadface.svg';

// component, element
import ModalContainer from 'src/components/common/modal/container/ModalContainer';
import CommentItem from 'src/components/shared/CommentItem';
import { Button } from '../../shared/element';

// api
import {
  bookmarkApi,
  deleteReHomingApi,
  getOneReHomingApi,
  likeApi,
  selectOnError,
} from 'src/core/redux/post/rehomingSlice';

// component start
const RehomingDetail = (): React.ReactElement => {
  const navigate = useNavigate();
  const appdispatch = useAppDispatch();
  const postId = useLocation().pathname.split('/')[3];
  const content = useSelector((state: any) => state.rehoming.post);
  const like = useSelector((state: any) => state.rehoming.post.liked);
  const [liked, setLiked] = React.useState(like);
  const bookmark = useSelector((state: any) => state.rehoming.post.bookmarked);
  const [bookmarked, setBookmarked] = React.useState(bookmark);
  const [sort, setSort] = React.useState('oldest');

  // PET AGE 관련 분기처리 필요
  // const petAge = content.petAge.split('-');
  const petAge = content.petAge;

  const onClickBookmark = () => {
    appdispatch(bookmarkApi(postId));
    setBookmarked(!bookmarked);
    appdispatch(getOneReHomingApi(postId));
  };

  const onClickLike = () => {
    appdispatch(likeApi(postId));
    setLiked(!liked);
    appdispatch(getOneReHomingApi(postId));
  };

  // 글 내용 태그 처리시 해당 함수 사용
  const postContent = (str: string) => {
    str = str.replace(/\r\n/gi, '<br />');
    str = str.replace(/\\n/gi, '<br />');
    str = str.replace(/\n/gi, '<br />');
    return str;
  };

  // move page
  // 글 목록으로 이동 (뒤로가기 x)
  const goToList = () => {
    navigate('/rehome', { replace: true });
  };

  // 글 수정 페이지로
  const postModify = () => {
    navigate('/rehoming/modify/' + postId);
  };

  // 2024.01 [유나] ---------------- MODAL START ------------
  const [onModal, setOnModal] = React.useState(false);
  const [onModalDel, setOnModalDel] = React.useState(false);
  const onError = useSelector(selectOnError);

  const onClickClose = () => {
    setOnModal(false);
  };


  // 삭제하시겠습니까? > 확인 > deleteRehomingApi
  // => reject인 경우 onError true > modal 메시지 분기
  const postDelete = async () => {
    try {
      await appdispatch(deleteReHomingApi(postId));
    } catch (e) {
      console.error('[RehomingDetailTemplate] postDelete Error : ', e);
    } finally {
      setOnModal(false);
      setOnModalDel(true);
    }
  };
  // 2024.01 [유나] ---------------- MODAL END --------------

  React.useEffect(() => {
    appdispatch(getOneReHomingApi(postId));
  }, [bookmarked, liked]);

  return (
    <React.Fragment>
      <S.Container>
        <S.MainInfoSection>
          <S.ImageBox>
            <S.Image src={content.rehomingImg[0]} />
          </S.ImageBox>
          <S.Info>
            <S.ProfileBox src={content.userImgUrl}>
              <div className="profile__image" />
              <p>{content.nickname}</p>
            </S.ProfileBox>
            <S.TitleSection>
              <p className="detail__title">{content.title}</p>
              <S.IconBox>
                <Heart
                  fill={like ? '#F35F4C' : ''}
                  onClick={() => onClickLike()}
                />
                <BookMark
                  fill={bookmark ? '#F35F4C' : ''}
                  onClick={() => onClickBookmark()}
                />
              </S.IconBox>
            </S.TitleSection>
            <S.IconBox>
              <div>
                <ViewCount stroke="#d9d9d9" />
                <p className="detail__count">{content.viewCnt}</p>
                <CommentCount fill="#d9d9d9" />
                <p className="detail__count">{content.bookmarkCnt}</p>
              </div>
            </S.IconBox>
            <S.ContentBox>
              <S.Location>
                <LocationIcon />
                <p>{content.cityName}</p>
              </S.Location>
              <S.PetInfoSection>
                <p>종</p>
                <p>
                  {content.category}, {content.type}
                </p>
                <p>이름</p>
                <p>{content.petName}</p>
                <p>생일</p>
                {/* {petAge.length > 2 ? (
                  <p>
                    {petAge[0]}년 {petAge[1]}월 {petAge[2]}일생
                  </p>
                ) : ( */}
                <p>{content.petAge}</p>
                {/* )} */}
                <p>성별</p>
                <p>{content.gender === 'BOY' ? '남' : '여'}</p>
              </S.PetInfoSection>
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
                  setOnModal(true);
                  // postDelete();
                }}
              >
                삭제하기
              </Button>
            </S.MngButtons>
          </S.Info>
        </S.MainInfoSection>
        <S.ContentSection>
          <p>
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
        </S.ContentSection>
        <S.CommentSection>
          <S.CommentTitleBox selected={sort}>
            <p className="detail_commentTitle">댓글</p>
            <p
              className="detail_select__old"
              onClick={() => {
                setSort('oldest');
              }}
            >
              등록순
            </p>
            <p
              className="detail_select__new"
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
              <>
                <CommentItem
                  key={idx}
                  username={comment.username}
                  userImgUrl={comment.userImgUrl}
                  commentContent={comment.commentContent}
                  createdAt={date}
                />
              </>
            );
          })}
          <S.CommentWrite>
            <p className="comment_write__username">코멘트작성자</p>
            <textarea
              className="comment_write__textarea"
              placeholder="댓글을 남겨보세요"
            />
            <p className="comment_write__submit">등록</p>
          </S.CommentWrite>
          <hr />
        </S.CommentSection>
        <S.Buttons>
          <button className="detail_button__list" onClick={goToList}>
            목록
          </button>
          <button className="detail_button__top">
            <Arrow className="detail_icon__arrow" />
            맨위로
          </button>
        </S.Buttons>
      </S.Container>

      {onModal && (
        <ModalContainer
          zIndex={1000}
          id="modaltest"
          onClickClose={onClickClose}
          title="게시글을 삭제할까요?"
          image={true}
        >
          <ModalIcon />
          <S.ModalButtonWrapper>
            <Button width="140px" _onClick={postDelete} modal>
              삭제하기
            </Button>
            <Button
              width="80px"
              bgcolor="coolgray400"
              _onClick={() => {
                setOnModal(false);
              }}
              modal
            >
              취소
            </Button>
          </S.ModalButtonWrapper>
        </ModalContainer>
      )}

      {onModalDel && (
        <ModalContainer
          zIndex={1000}
          id="postDeleted"
          onClickClose={onClickClose}
          title={!onError ? '게시글이 삭제되었습니다' : '문제가 발생했습니다.'}
          image={true}
        >
          <ModalIcon />

          <Button margin="20px 0 0 0" width="200px" _onClick={goToList} modal>
            목록으로 이동하기
          </Button>
        </ModalContainer>
      )}
    </React.Fragment>
  );
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

export default RehomingDetail;

import React from 'react';
import * as S from './DetailTemplate.style';
//util
import { useSelector } from 'react-redux';
import { useAppDispatch } from 'src/core/store';
import { useLocation, useNavigate } from 'react-router-dom';
//component
import Carousel from '../carousel/Carousel';
import InfoSection from './sections/InfoSection';
import ModalContainer from 'src/components/common/modal/container/ModalContainer';
//element and icon
import { Button } from '../element';
import { ReactComponent as ModalIcon } from '../../../asset/modalicon/neutralface.svg';
//type
import { Post } from 'src/types/post';
//api
import {
  deletePostApi,
  getOnePostApi,
  selectOnGetPostError,
  selectOnDeleteError,
} from 'src/core/redux/post/postSlice';

// qna comment용
interface PropsType {
  comment?: boolean;
}

const DetailTemplate = (props: PropsType) => {
  const { comment } = props;

  // util
  const appdispatch = useAppDispatch();
  const navigate = useNavigate();

  // url variable
  const locationNow = useLocation().pathname.split('/')[1];
  const postId = useLocation().pathname.split('/')[3];

  // locationNow -> postType (???)
  const [postType, setPostType] = React.useState('');

  // modal
  const [onAskModal, setOnAskModal] = React.useState(false);
  const [onFailModal, setOnFailModal] = React.useState(false);
  const [onDeleteCheckModal, setOnDeleteCheckModal] = React.useState(false);
  const [onDeletedModal, setOnDeletedModal] = React.useState(false);

  // useSelector
  // -- error
  const onDeleteError = useSelector(selectOnDeleteError);
  const onGetPostError = useSelector(selectOnGetPostError);
  // -- 서버에서 받아온 상세조회 데이터
  const rehomePostData = useSelector((state: any) => state?.post?.rehome);
  const tradePostData = useSelector((state: any) => state?.post?.trade);

  // 예비용 (추후 스크립트 변경 후 삭제)
  const defaultImages = [
    'https://cdn-icons-png.flaticon.com/512/4253/4253264.png',
    'https://cdn-icons-png.flaticon.com/512/194/194279.png',
  ];

  // 모달 close
  const onClickClose = () => {
    setOnAskModal(false);
    setOnFailModal(false);
    setOnDeleteCheckModal(false);
    setOnDeletedModal(false);
  };

  // 문의하기 버튼 클릭 => 해당 모달 오픈
  const onClickAsk = () => {
    setOnAskModal(true);
  };

  // 문의하기 모달 메시지
  const askModalMessage = {
    tradeTitle: '거래게시판 주의',
    tradeMessage: (
      <>
        <p>진짜 사려는 건가?</p>
        <p>진짜진짜로?</p>
      </>
    ),
    rehomeTitle: '',
    rehomeMessage: '',
  };

  // 글 수정하기(페이지 이동)
  const handleClickUpdate = () => {
    if (postType && postId) {
      navigate(`/${postType}/modify/${postId}`);
    } else {
      // 게시판 타입이 비정상적이거나 postId가 falsy값인 경우
      setOnFailModal(true);
    }
  };

  // 글 삭제하기
  // 삭제하시겠습니까? > 확인 > deleteRehomingApi
  // => 응답 대기하여 reject인 경우 onError true? > modal 메시지 분기
  const handleClickDelete = async () => {
    try {
      if (postType && postId) {
        await appdispatch(
          deletePostApi({
            postId,
            postType: locationNow === 'rehome' ? 'rehoming' : locationNow,
          }),
        );
      } else {
        // 게시판 타입이 비정상적이거나 postId가 falsy값인 경우
        setOnFailModal(true);
      }
    } catch (e) {
      console.error('[DETAIL TEMPLATE] handleClickDelete Error : ', e);
    } finally {
      setOnDeleteCheckModal(false);
      setOnDeletedModal(true);
    }
  };

  // 목록으로 돌아가기
  const goToList = () => {
    navigate(`/${postType}`, { replace: true });
  };

  // 글 내용 태그 처리시 해당 함수 사용
  const postContent = (str: string) => {
    str = str.replace(/\r\n/gi, '<br />');
    str = str.replace(/\\n/gi, '<br />');
    str = str.replace(/\n/gi, '<br />');
    return str;
  };

  // location에 따른 분기 및 글 상세조회 api call
  React.useEffect(() => {
    // 게시글 조회
    appdispatch(
      getOnePostApi({
        postId,
        postType: locationNow === 'rehome' ? 'rehoming' : locationNow,
      }),
    );

    // 현재 위치에 따라 state set
    switch (locationNow) {
      case 'rehome':
        setPostType('rehome');
        break;
      case 'trade':
        setPostType('trade');
        break;
      case 'qna':
        setPostType('qna');
        break;
      default:
        // 카테고리 타입 없음 = 비정상 접근 > 목록으로 redirect
        setPostType('');
        setOnFailModal(true);
    }

    // 글 번호가 비정상적인 경우
    if (Number(postId) < 1) {
      setOnFailModal(true);
    }
  }, [locationNow]);

  return (
    <S.Container>
      {/*---------- 캐러셀 및 판매/분양 글 정보 ----------*/}
      <S.TopWrapper>
        <Carousel
          imageList={
            locationNow === 'rehome'
              ? rehomePostData?.rehomingImg
              : tradePostData?.imageList
          }
        ></Carousel>

        {/* ---------- 글 정보 영역 ---------- */}
        <InfoSection
          info={locationNow === 'rehome' ? rehomePostData : tradePostData}
          propsPostType={postType}
          onClickAsk={onClickAsk}
        />
      </S.TopWrapper>

      {/*---------- 글 관리 버튼 영역 ----------*/}
      <S.Admin>
        <Button
          width="80px"
          height="42px"
          fontSize="16px"
          colors="coolgray400"
          _onClick={() => {
            handleClickUpdate();
          }}
        >
          수정하기
        </Button>
        <Button
          width="80px"
          height="42px"
          fontSize="16px"
          colors="coolgray400"
          _onClick={() => {
            setOnDeleteCheckModal(true);
          }}
        >
          삭제하기
        </Button>
      </S.Admin>
      <S.Hr />

      {/* ---------- 상세 설명 영역 ---------- */}
      <S.Description>
        {locationNow === 'rehoming'
          ? rehomePostData?.description
          : tradePostData?.content}
      </S.Description>

      {/* ---------- 코멘트 영역 ----------*/}

      {/* ---------- 모달 영역 ----------*/}
      {/* 문의하기 버튼 클릭시 팝업되는 모달 */}
      {onAskModal && (
        <ModalContainer
          zIndex={1000}
          id="warnAsk"
          onClickClose={onClickClose}
          title={
            locationNow === 'trade'
              ? askModalMessage.tradeTitle
              : askModalMessage.rehomeTitle
          }
          image={true}
        >
          <ModalIcon />
          {locationNow === 'trade'
            ? askModalMessage.tradeMessage
            : askModalMessage.tradeMessage}
          <Button
            modal
            width="120px"
            margin="50px 0 0 0"
            _onClick={() => {
              // 추후 문의 navigate로 변경 필요
              onClickClose();
            }}
          >
            확인했어요
          </Button>
        </ModalContainer>
      )}

      {/* 비정상적인 접근시 팝업되는 모달  */}
      {onFailModal && (
        <ModalContainer
          zIndex={1000}
          id="fail"
          onClickClose={onClickClose}
          title="비정상적인 접근입니다."
          image={true}
        >
          <ModalIcon />
          <p>목록으로 돌아갑니다.</p>
          <Button modal width="80px" margin="32px 0 0 0" _onClick={goToList}>
            확인
          </Button>
        </ModalContainer>
      )}

      {/* 삭제 버튼 클릭시 팝업되는 모달 */}
      {onDeleteCheckModal && (
        <ModalContainer
          zIndex={1000}
          id="modaltest"
          onClickClose={onClickClose}
          title="게시글을 삭제할까요?"
          image={true}
        >
          <ModalIcon />
          <S.ModalButtonWrapper>
            <Button width="140px" _onClick={handleClickDelete} modal>
              삭제하기
            </Button>
            <Button
              width="80px"
              bgcolor="coolgray400"
              _onClick={() => {
                setOnDeleteCheckModal(false);
              }}
              modal
            >
              취소
            </Button>
          </S.ModalButtonWrapper>
        </ModalContainer>
      )}

      {/* 삭제 버튼 클릭 > 확인했어요 클릭 후 요청 상태 팝업되는 모달 */}
      {onDeletedModal && (
        <ModalContainer
          zIndex={1000}
          id="postDeleted"
          onClickClose={onClickClose}
          title={
            !onDeleteError ? '게시글이 삭제되었습니다' : '문제가 발생했습니다.'
          }
          image={true}
        >
          <ModalIcon />

          <Button margin="20px 0 0 0" width="200px" _onClick={goToList} modal>
            목록으로 이동하기
          </Button>
        </ModalContainer>
      )}
    </S.Container>
  );
};

export default DetailTemplate;

//  MOCKDATA
// const postData: Post.Post = {
const POST: Post.Post = {
  nickname: 'nickname',
  image:
    'https://img.freepik.com/free-photo/cute-spitz_144627-7076.jpg?w=826&t=st=1704618236~exp=1704618836~hmac=af87e5330a94e6f2630efa6b584e2e66d33d5497c41cb255bb6405b4ed0e2ece',
  title: 'title',
  content: '분양글 내용',
  bookmarkCnt: 0,
  bookmarked: false,
  category: '강아지',
  cityCountryName: '--구',
  cityName: '--도 --시',
  createdAt: '2023-12-17T14:38:08.067204',
  description: '직접 작성 가능한 동물에 대한 추가 설명',
  detailAdName: '---아파트',
  fullAdName: '--동 ----호',
  gender: 'BOY',
  likeCnt: 12,
  liked: false,
  petAge: '2023-12-01',
  petName: '반려동물이름',
  postType: '분양',
  rehomingId: 1,
  rehomingImg: [
    'https://img.freepik.com/free-photo/cute-spitz_144627-7076.jpg?w=826&t=st=1704618236~exp=1704618836~hmac=af87e5330a94e6f2630efa6b584e2e66d33d5497c41cb255bb6405b4ed0e2ece',
    'https://img.freepik.com/free-photo/pug-dog-isolated-white-background_2829-11416.jpg?w=826&t=st=1704618251~exp=1704618851~hmac=77bf4d816a3cecd5df7cf368cc306eef7433d0cdfe8fb271e5c34842bfd064f9',
    'https://img.freepik.com/free-photo/cute-golden-retriever_144627-26658.jpg?w=740&t=st=1704618272~exp=1704618872~hmac=5be40517a07eda72e8424d61f08e7afb24b1c480d11f2235a10184083eb9f9ae',
    'https://img.freepik.com/premium-photo/cute-puppies-pomeranian-mixed-breed-pekingese-dog-run-grass-with-happiness_34266-1082.jpg?w=900',
    'https://img.freepik.com/free-photo/front-view-adorable-shiba-inu-dog_23-2149457807.jpg?size=626&ext=jpg&ga=GA1.1.549176277.1704618225&semt=sph',
    'https://img.freepik.com/premium-photo/dog-breed-pomeranian-spitz-funny-stands-red-background_810623-1359.jpg?size=626&ext=jpg&ga=GA1.1.549176277.1704618225&semt=sph',
  ],
  status: 'REHOMING_FINDING',
  townShipName: '--동',
  type: '포메라니안',
  updatedAt: '2023-12-17T14:45:27.4884334',
  userId: 1,
  viewCnt: 14,
};

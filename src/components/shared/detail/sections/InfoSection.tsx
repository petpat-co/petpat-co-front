import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useAppDispatch } from 'src/core/store';

import { Post } from 'src/types/post';

// icon
import Heart from 'src/asset/postIcon/Heart';
import Bookmark from 'src/asset/postIcon/Bookmark';
// import { ReactComponent as BookMark } from '../../../../asset/bookmark.svg';
import { ReactComponent as SmallHeart } from '../../../../asset/postIcon/smallheart.svg';
import { ReactComponent as ViewCount } from '../../../../asset/postIcon/viewcount.svg';
import { ReactComponent as LocationIcon } from '../../../../asset/postIcon/location.svg';
import { Button } from '../../element';
// api
import {
  bookmarkApi,
  likeApi,
} from '../../../../core/redux/post/PostDetailSlice';

interface PropsType {
  onClickAsk: () => void; // 문의하기 버튼용 함수 (모달 팝업)
  propsPostType: string | null; // 글 타입 (상위컴포넌트인 DetailTemplate에서 내려준 postType - rehome, trade, qna)
  info: Post.Post;
  handleClickUpdate: any;
  setOnDeleteCheckModal: any;
}

const InfoSection = (props: PropsType) => {
  // 일단 혹시 몰라서 모든 props 다 적어놓았는데
  // 추후 사용하지 않는 값들은 조정할 수 있도록 해보겠습니다 :D
  const {
    userId,
    image,
    nickname,
    postType,
    rehomingId,
    tradeId,
    qnaId,
    postId,
    title,
    description,
    content,
    createdAt,
    status,
    liked,
    likeCnt,
    bookmarked,
    bookmarkCnt,
    viewCnt,
    rehomingImg,
    tradeImg,
    qnaImg,
    images,
    imageList,
    cityName,
    townShipName,
    cityCountryName,
    detailAdName,
    region,
    category,
    type,
    petName,
    petAge,
    gender,
    neutralized,
    // -- 접종여부
    kennelCough,
    rabies,
    covidEnteritis,
    fpv,
    dhppl,
    felv,
    comprehensiveVaccine,
    influenza,
    // --
    price,
    tradeCategoryDetailName,
  } = props.info;
  const {
    propsPostType,
    onClickAsk,
    handleClickUpdate,
    setOnDeleteCheckModal,
  } = props;
  const vaccinationStatus = [
    { name: '켄넬코프', value: kennelCough },
    { name: '광견병', value: rabies },
    { name: '코로나 장염', value: covidEnteritis },
    { name: 'FPV', value: fpv },
    { name: 'DHPPL', value: dhppl },
    { name: 'FELV', value: felv },
    { name: '종합 백신', value: comprehensiveVaccine },
    { name: '인플루엔자', value: influenza },
  ];

  const appdispatch = useAppDispatch();

  const nowYear = new Date().getFullYear();
  const petBirthYear = petAge?.split('-')[0];

  // status
  const [isLiked, setIsLiked] = React.useState(liked);
  const [isBookmarked, setIsBookmarked] = React.useState(bookmarked);

  // props 데이터 변경 감지 > 상태 업데이트
  useEffect(() => {
    if (isLiked === liked) return;
    setIsLiked(liked);

    if (isBookmarked === bookmarked) return;
    setIsBookmarked(bookmarked);
  }, [liked, bookmarked]);

  // 상세설명 위치 테스트
  const DESCRIPTIONTEST = true;
  // const DESCRIPTIONTEST = false;

  // price
  const krPrice = price ? Number(price).toLocaleString('ko-KR') : '----';

  // like
  const handleClickLike = () => {
    setIsLiked((prev) => !prev);
    appdispatch(likeApi({ postType, postId }));
  };
  // bookmark
  const handleClickBookmark = () => {
    setIsBookmarked((prev) => !prev);
    appdispatch(bookmarkApi({ postType, postId }));
  };

  return (
    <Container>
      {/* ------- 사용자정보(이미지,닉네임) ------- */}
      <User>
        <ProfileImg src={image ? image : null} />
        <Nickname>{nickname}</Nickname>
      </User>

      <Info>
        {/* ------- 타이틀 영역 ------- */}
        <Title>
          <p>{title}</p>
          {/* 북마크, 좋아요 */}
          <IconWrapper onClick={handleClickBookmark}>
            {isBookmarked ? (
              <Bookmark width="20px" height="20px" fill="#F35F4C" />
            ) : (
              <Bookmark width="20px" height="20px" />
            )}
          </IconWrapper>
          <IconWrapper onClick={handleClickLike}>
            {isLiked ? (
              <Heart width="22px" height="22px" fill="#F35F4C" />
            ) : (
              <Heart width="22px" height="22px" />
            )}
          </IconWrapper>
        </Title>

        {/* 좋아요수, 조회수 */}
        {/* <CountBox>
          <SmallHeart width="20px" height="20px" />
          <p>{likeCnt}</p>
          <ViewCount width="20px" height="20px" stroke="#D9D9D9" />
          <p>{viewCnt}</p>
        </CountBox> */}

        {/* ------- 가격(용품거래) ---------- */}
        {propsPostType === 'trade' ? <Price>{krPrice}원</Price> : null}

        {/* ------- 지역(공통) -------*/}
        <Location propsPostType={propsPostType}>
          <LocationIcon width="16px" height="16px" />
          <p>
            {/* {region ? region : `${cityName} ${cityCountryName}`} */}
            {/* 서버 데이터 변경시 아래로 변경 */}
            {region}
          </p>
        </Location>

        {/* ---------- 반려동물 정보(분양) ---------- */}
        {propsPostType === 'rehome' ? (
          <Pet>
            <p>이름</p>
            <p>{petName}</p>
            <p>종</p>
            <p>
              {category}, {type}
            </p>
            <p>성별</p>
            <p>
              {gender === 'BOY' ? '남' : gender === 'GIRL' ? '여' : '알수없음'}
            </p>
            <p>생일</p>
            <p>
              {petAge}, {nowYear - Number(petBirthYear)}살
            </p>
            <p>중성화</p>
            <p>{neutralized ? '완료' : '미완료'}</p>
            <p>접종</p>
            <p>
              {vaccinationStatus &&
                vaccinationStatus.map((item, idx) => {
                  const trueVaccinations = vaccinationStatus.filter(
                    (item) => item.value,
                  );
                  return (
                    item.value && (
                      <>
                        {item.name}
                        {idx < trueVaccinations.length - 1 && ', '}{' '}
                      </>
                    )
                  );
                })}
            </p>
          </Pet>
        ) : null}

        <Hr />
        <DescriptionTitle>상세내용</DescriptionTitle>
        {/* ---------- 상세내용 영역 테스트 ---------- */}
        {!DESCRIPTIONTEST ? (
          <>
            <Description>
              계절이 지나가는 하늘에는 가을로 가득 차 있습니다.
              <br />
              나는 아무 걱정도없이 가을 속의 별들을 다 헤일 듯합니다.
              <br />
              가슴속에 하나둘 새겨지는 별을 이제 다 못 헤는 것은 쉬이 아침이
              오는 까닭이요, 내일 밤이 남은 까닭이요,
              <br />
              <br />
              아직 나의 청춘이 다하지 않은 까닭입니다. <br />별 하나에 추억과 별
              하나에 사랑과 별 하나에 쓸쓸함과 별 하나에 동경과 별 하나에 시와
              별 하나에 어머니, 어머니, 어머님, <br />
              <br />
              나는 별 하나에 아름다운 말 한마디씩 불러 봅니다. <br />
              소학교 때 책상을 같이 했던 아이들의 이름과,
              <br /> 패, 경, 옥, 이런 이국 소녀들의 이름과, 벌써 아기 어머니 된
              계집애들의 이름과, <br />
              가난한 이웃 사람들의 이름과, 비둘기, 강아지, 토끼, 노새, 노루,
              '프랑시스 잠[1]', <br />
              <br />
              '라이너 마리아 릴케[2]' <br />
              이런 시인의 이름을 불러 봅니다. <br />
              이네들은 너무나 멀리 있습니다. <br />
              <br />
              별이 아스라이 멀듯이. 어머님, <br />
              <br />
              그리고 당신은 멀리 북간도에 계십니다.
              <br /> <br />
              나는 무엇인지 그리워 이 많은 별빛이 내린 언덕 위에 내 이름자를 써
              보고 흙으로 덮어 버리었습니다. <br />
              딴은[3] 밤을 새워 우는 벌레는 부끄러운 이름을 슬퍼하는 까닭입니다.{' '}
              <br />
              그러나 겨울이 지나고 나의 별에도 봄이 오면 무덤 위에 파란 잔디가
              피어나듯이 내 이름자 묻힌 언덕 위에도 자랑처럼 풀이 무성할 거외다.
            </Description>
          </>
        ) : (
          <Description>{content}</Description>
        )}

        {/* ---------- 문의 버튼 ---------- */}
        {!DESCRIPTIONTEST ? null : (
          <ButtonWrapper>
            <Button
              width="240px"
              height="64px"
              bgcolor="primary"
              radius="40px"
              colors="white"
              _onClick={() => {
                onClickAsk();
              }}
            >
              {propsPostType !== 'rehome' ? '문의하기' : '분양문의'}
            </Button>
          </ButtonWrapper>
        )}

        <Admin>
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
        </Admin>
      </Info>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  height: 100%;
`;

const User = styled.div`
  display: flex;
  gap: 16px;
  align-items: center;
`;

const ProfileImg = styled.div<{ src: string | null }>`
  width: 48px;
  height: 48px;
  border-radius: 32px;
  background-color: ${({ theme }) => theme.colors.coolgray200};
`;

const Nickname = styled.p`
  font-size: 16px;
  font-weight: 700;
`;

const Info = styled.div`
  padding: 16px 0;
  height: 0;
`;

const ButtonWrapper = styled.div`
  width: 100%;
  height: fit-content;
  padding: 50px 0 24px 0;
  text-align: right;
`;

const Title = styled.div`
  font-size: 24px;
  font-weight: 700;

  display: grid;
  grid-template-columns: 1fr 32px 32px;

  align-items: center;
`;

const CountBox = styled.div`
  margin-top: 8px;
  display: flex;
  align-items: center;
  font-size: 16px;
  color: #d9d9d9;

  & > p {
    margin: 0 8px 0 4px;
  }
`;

const Price = styled.p`
  margin-top: 24px;
  font-size: 20px;
  font-weight: 700;
`;

const Location = styled.div<{ propsPostType: string | null }>`
  // margin: ${({ propsPostType }) =>
    propsPostType === 'rehome' ? '48px 0 24px 0' : '16px 0 24px 0'};
  margin: 16px 0;

  display: flex;
  gap: 8px;
  align-items: center;

  font-weight: 700;
  color: ${({ theme }) => theme.colors.coolgray400};

  & > p {
    margin-top: 1px;
  }
`;

const Pet = styled.div`
  display: grid;
  gap: 8px 8px;
  grid-template-rows: repeat(5, 1fr);
  grid-template-columns: 48px 0.45fr 48px 1fr;
  color: ${({ theme }) => theme.colors.coolgray400};
`;

export const Hr = styled.hr`
  // margin: 32px 0;
  margin: -24px 0 32px 0;
  border: 0;
  height: 1px;
  background-color: ${({ theme }) => theme.colors.primary};
`;

const DescriptionTitle = styled.p`
  font-size: 16px;
  color: ${({ theme }) => theme.colors.primary};
  font-weight: 600;
`;

const Description = styled.div`
  margin: 16px 0 24px 8px;
  padding: 16px 0;
  font-size: 16px;
  height: fit-content;
`;

const IconWrapper = styled.div`
  width: fit-content;
  height: fit-content;
  display: flex;
  gap: 8px;
  align-items: center;
  cursor: pointer;
`;
export const Admin = styled.div`
  position: static;
  display: flex;
  justify-content: flex-end;
`;
export default InfoSection;

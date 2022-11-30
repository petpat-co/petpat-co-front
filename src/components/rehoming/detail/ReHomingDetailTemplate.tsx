import { useState } from 'react';
import Select from '../../shared/Select';
import * as S from './ReHomingDetailTemplate.style';
import * as MainS from '../ReHomingTemplate.style';
import { ReactComponent as Arrow } from '../../../asset/arrowIcon.svg';
import { DisplayGrid } from '../../shared/element';
import { ReactComponent as View } from '../../../asset/viewIcon.svg';
import { ReactComponent as Comment } from '../../../asset/commentIcon.svg';

const ReHomingDetailTemplate = () => {
  const [dogCategory, setDogCategory] = useState<number>(0);
  const [category, setCategory] = useState<number>(0);
  return (
    <S.Wrap>
      <MainS.LeftBox>
        <MainS.FirstBox>
          <MainS.HomeBox>
            <span> 홈 </span>
            <Arrow stroke="#333" strokeWidth="1" width="30" height="30" />
          </MainS.HomeBox>
          {firstData.map((el, idx) => {
            return (
              <MainS.SelectWrap key={idx}>
                <Select
                  data={el.list}
                  value={idx ? category : dogCategory}
                  setValue={idx ? setCategory : setDogCategory}
                />
                {idx ? null : (
                  <Arrow stroke="#333" strokeWidth="1" width="30" height="30" />
                )}
              </MainS.SelectWrap>
            );
          })}
        </MainS.FirstBox>
      </MainS.LeftBox>
      <S.ImgWrap>
        <S.IconBox isRotate={true}>
          <Arrow stroke="#333" strokeWidth="3" width="40" height="40" />
        </S.IconBox>
        <S.ImgBox>
          <S.ImgBig>
            <img
              src="https://news.nateimg.co.kr/orgImg/hn/2019/01/21/00501111_20190121.JPG"
              alt="대표이미지"
            />
          </S.ImgBig>
          <S.ImgSmallBox>
            <S.ImgSmallInner length={imgData.length + 1}>
              {imgData.map((item, idx) => {
                if (idx === 2) {
                  return (
                    <S.BgImgBox key={idx}>
                      <img
                        src="https://news.nateimg.co.kr/orgImg/hn/2019/01/21/00501111_20190121.JPG"
                        alt="대표이미지"
                      />
                    </S.BgImgBox>
                  );
                }
                return (
                  <S.ImgSmall key={idx}>
                    <img
                      src="https://news.nateimg.co.kr/orgImg/hn/2019/01/21/00501111_20190121.JPG"
                      alt="대표이미지"
                    />
                  </S.ImgSmall>
                );
              })}
            </S.ImgSmallInner>
          </S.ImgSmallBox>
        </S.ImgBox>
        <S.IconBox>
          <Arrow stroke="#333" strokeWidth="3" width="40" height="40" />
        </S.IconBox>
      </S.ImgWrap>
      {/* profile */}
      <S.ProfileBox>
        <S.ProfileImg
          src="https://news.nateimg.co.kr/orgImg/hn/2019/01/21/00501111_20190121.JPG"
          alt="프로필이미지"
        />
        <S.NicknameAreaBox>
          <p>닉네임 들어갈 자리</p>
          <p>서울시 관악구 난곡동</p>
        </S.NicknameAreaBox>
        <S.ReportBox>신고하기</S.ReportBox>
      </S.ProfileBox>
      {/* 내용 */}
      <S.ContentsBox>
        <DisplayGrid height="43px" padding="10px 0 0">
          <S.IngText>모집중</S.IngText>
          <S.DateText>22.10.11</S.DateText>
        </DisplayGrid>
        <DisplayGrid height="auto" flexDirection="column" padding="10px 0 0">
          <S.TitleText>
            우리집 댕댕이가 새끼를 낳았어요 댕댕이 새끼의 주인이 될분있나요?
          </S.TitleText>
          <S.ContentText>
            우리집 댕댕이는 골든 리트리버입니다. 총 6마리를 낳았는데 암컷 3마리
            수컷 3마리를 낳았어요. 관심있으신 분들은 채팅을 통해 말씀해 주세요~!
            우리집 댕댕이는 골든 리트리버입니다. 총 6마리를 낳았는데 암컷 3마리
            수컷 3마리를 낳았어요. 관심있으신 분들은 채팅을 통해 말씀해 주세요~!
            우리집 댕댕이는 골든 리트리버입니다. 총 6마리를 낳았는데 암컷 3마리
            수컷 3마리를 낳았어요. 관심있으신 분들은 채팅을 통해 말씀해 주세요~!
          </S.ContentText>
        </DisplayGrid>
        <S.PetProfileBox>
          <DisplayGrid height="auto" justify="flex-start" margin="0 0 22px">
            <p>품종 :</p> <span>리트리버</span>
          </DisplayGrid>
          <DisplayGrid height="auto" justify="flex-start" margin="0 0 22px">
            <p>나이 :</p> <span>6개월</span>
          </DisplayGrid>
        </S.PetProfileBox>
        <S.BottomIconBox>
          <View />
          <S.grayText>100</S.grayText>
          <Comment />
          <S.grayText>100</S.grayText>
        </S.BottomIconBox>
      </S.ContentsBox>
      <DisplayGrid height="auto" justify="flex-start" margin="20px 0 70px">
        {hashTag.map((item) => (
          <S.HashTag key={item}>
            <span>#</span> {item}
          </S.HashTag>
        ))}
      </DisplayGrid>
    </S.Wrap>
  );
};

export default ReHomingDetailTemplate;
const firstData = [
  {
    list: ['강아지', '고양이', '기타'],
  },
  {
    list: ['강아지 간식 사료', '고양이 간식 츄르', '기타'],
  },
];
const imgData = [0, 1, 2, 3, 4, 5];
const hashTag = ['강아지', '고양이', '포메라니안', '아이 귀여워'];

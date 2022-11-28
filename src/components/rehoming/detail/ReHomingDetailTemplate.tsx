import { useState } from 'react';
import Select from '../../shared/Select';
import * as S from './ReHomingDetailTemplate.style';
import * as MainS from '../ReHomingTemplate.style';
import { ReactComponent as Arrow } from '../../../asset/arrowIcon.svg';

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

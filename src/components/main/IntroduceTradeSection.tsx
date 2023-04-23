import { memo } from 'react';
import { ArrowIcon } from 'src/asset/arrow';
import { MainTemplateStyle as S } from './MainTemplate.style';
import { MainIntroduceTemplateStyle as Style } from './IntroduceTradeSection.style';
import MainCard from '../common/card/MainCard';

export const mockData = [
  {
    image: '',
    title: '모집중',
    subtitle: '우리집 댕댕이가 새끼를 낳았어요',
    nick: '댕댕집사',
    viewCnt: 100,
    commentCnt: 100,
  },
  {
    image: '',
    title: '모집중',
    subtitle: '우리집 댕댕이가 새끼를 낳았어요',
    nick: '댕댕집사',
    viewCnt: 100,
    commentCnt: 100,
  },
  {
    image: '',
    title: '모집중',
    subtitle: '우리집 댕댕이가 새끼를 낳았어요',
    nick: '댕댕집사',
    viewCnt: 100,
    commentCnt: 100,
  },
];

const IntroduceTradeSection = () => {
  return (
    <S.SectionWrap>
      <Style.SecondSectionWrap>
        <Style.CardWrap>
          {mockData.map((el) => (
            <MainCard el={el} />
          ))}
        </Style.CardWrap>

        <div>
          <ArrowIcon.North iconStyles={{ size: '32', color: '#000' }} />
          <Style.TextWrap>
            <p>
              냥댕
              <br />
              중고물품
              <br />
              싸게 팔아요!
            </p>

            <span>
              우리 동네 이웃이 올린 <br />
              입양글이라서 믿을 수 있어요 <br />
              위치 지정 필터를 사용해서 <br />더 많은 입양글을 찾아보세요
            </span>
          </Style.TextWrap>
        </div>
      </Style.SecondSectionWrap>
    </S.SectionWrap>
  );
};

export default memo(IntroduceTradeSection);

import { memo } from 'react';
import { ArrowIcon } from 'src/asset/arrow';
import { MainTemplateStyle as S } from './MainTemplate.style';
import { MainSecondTemplateStyle as Style } from './SecondSection.style';
import MainCard from '../common/card/MainCard';
import { mockData } from './IntroduceTradeSection';

const SecondSection = () => {
  return (
    <S.SectionWrap>
      <Style.SecondSectionWrap>
        <div>
          <ArrowIcon.North iconStyles={{ size: '32', color: '#000' }} />
          <Style.TextWrap>
            <p>
              펫팻에서
              <br />
              댕냥 집사님을
              <br />
              찾고있어요!
            </p>

            <span>
              우리 동네 이웃이 올린 <br />
              입양글이라서 믿을 수 있어요 <br />
              위치 지정 필터를 사용해서 <br />더 많은 입양글을 찾아보세요
            </span>
          </Style.TextWrap>
        </div>

        <Style.CardWrap>
          {mockData.map((el) => (
            <MainCard el={el} />
          ))}
        </Style.CardWrap>
      </Style.SecondSectionWrap>
    </S.SectionWrap>
  );
};

export default memo(SecondSection);

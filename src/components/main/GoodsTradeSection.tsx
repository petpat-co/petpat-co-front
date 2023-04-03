import { memo, useMemo, useState } from 'react';
import { v4 } from 'uuid';
import { Text } from '../shared/element/Text';
import { GoodsTradeSectionStyled as S } from './MainTemplate.style';

const GoodsTradeSection = () => {
  const [curSlide, setCurSlide] = useState(0);

  const slideList = useMemo(
    () => [
      {
        bg: 'red',
        right: '0',
        selectedRight: '0',
      },
      { bg: 'green', right: '-60%', selectedRight: '-10%' },
      { bg: 'pink', right: '-70%', selectedRight: '-20%' },
      { bg: 'yellow', right: '-80%', selectedRight: '-30%' },
    ],
    [curSlide],
  );

  const onClickSlide = (i: number) => {
    setCurSlide(i);
  };
  return (
    <S.TradeWrap>
      <Text
        textStyle={{
          padding: '0px 100px 0',
          fontSize: '40px',
          fontWeight: '700',
          lineHeight: '130%',
        }}
      >
        {'조회수 제일 많은\n중고거래는?'}
      </Text>
      <S.SlideBox>
        {slideList.map((el, idx) => (
          <S.SlideInner
            key={v4()}
            isSelected={curSlide === idx}
            bg={el.bg}
            right={el.right}
            idx={idx}
            curIdx={curSlide}
            selectedRight={el.selectedRight}
            onClick={() => {
              onClickSlide(idx);
            }}
          >
            {idx + 1}
          </S.SlideInner>
        ))}
      </S.SlideBox>
    </S.TradeWrap>
  );
};

export default memo(GoodsTradeSection);

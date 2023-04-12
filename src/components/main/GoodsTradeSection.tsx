import { memo, useMemo, useState } from 'react';
import { Icon } from 'src/asset/icon/Index';
import { MainImages } from 'src/asset/main';
import { v4 } from 'uuid';
import { Text } from '../shared/element/Text';
import { GoodsTradeSectionStyled as S } from './MainTemplate.style';

const GoodsTradeSection = () => {
  const [curSlide, setCurSlide] = useState(0);

  const slideList = useMemo(
    () => [
      {
        bg: 'white',
        right: '0',
        selectedRight: '0',
        url: MainImages.tradeBg01,
      },
      { bg: '#F35F4C', right: '-60%', selectedRight: '-10%', url: '' },
      { bg: '#FFDFDB', right: '-70%', selectedRight: '-20%', url: '' },
      { bg: '#FFEAE8', right: '-80%', selectedRight: '-30%', url: '' },
    ],
    // eslint-disable-next-line
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
            <S.NumberText>{idx + 1}</S.NumberText>
            {curSlide === idx && (
              <S.SlideContents url={el.url}>
                <S.IconBox>
                  <Icon.View size="30" color="#252525" />
                  <p>{(1000).toLocaleString('ko-KR')}</p>
                  <Icon.Comment size="22" color="#252525" />
                  <p>{(1000).toLocaleString('ko-KR')}</p>
                </S.IconBox>
                <S.InfoTextBox>
                  <Text
                    textStyle={{
                      fontSize: '24px',
                      lineHeight: '35px',
                      textAlign: 'right',
                    }}
                  >
                    {
                      '정말 귀여운 장난감인데\n우리집 아이가 딱 한 번밖에\n쓰질 않아서 너무 아까워요.'
                    }
                  </Text>
                </S.InfoTextBox>
              </S.SlideContents>
            )}
          </S.SlideInner>
        ))}
      </S.SlideBox>
    </S.TradeWrap>
  );
};

export default memo(GoodsTradeSection);

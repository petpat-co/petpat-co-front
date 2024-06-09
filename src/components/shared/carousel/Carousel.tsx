import React, { useState } from 'react';
import * as S from './Carousel.style';
import { ReactComponent as Arrow } from '../../../asset/arrow/carouselArrow.svg';


interface PropsType {
  imageList: Array<string>;
}

const Carousel = (props: PropsType) => {
  const { imageList } = props;

  // transition on/off
  const [offTransition, setOffTransition] = React.useState(false);
  // 현재 머무르고 있는 image index
  const [curIndex, setCurIndex] = React.useState(0);

  const setSliders = () => {
    const addedData = [];

    for (let i = 0; i < imageList?.length + 1; i++) {
      addedData.push(imageList[i % imageList.length]);
    }

    return addedData;
  };

  // 첫번째, 마지막 인덱스 눈속임 함수
  const handleSlide = (index: number) => {
    if (index < 0) {
      direction.current = 'left';
      index = slides.length - 2;
    } else if (index >= slides.length - 1) {
      direction.current = 'right';
      index = 0;
    }
    setOffTransition(true);
    setCurIndex(index);
  };

  // 방향 판단
  const handleSwipe = (direction: any) => {
    handleSlide(curIndex + direction);
  };

  // 가짜 데이터를 이어붙인 배열 생성
  const slides = setSliders();
  // 방향 참조값
  const direction = React.useRef('left');
  const transition = offTransition ? '0s' : '0.3s';

  // 일정 시간(transition) button 동작 disable
  const [disabled, setDisabled] = React.useState(false);

  const buttonControll = () => {
    setDisabled(true);
    setTimeout(() => setDisabled(false), 300);
  };

  React.useEffect(() => {
    if (direction.current === 'right' && curIndex === slides.length - 1) {
      setTimeout(() => {
        setOffTransition(true);
        setCurIndex(0);
      }, 1000);

      setTimeout(() => {
        setOffTransition(false);
      }, 1100);
    } else if (direction.current === 'left' && curIndex === slides.length - 1) {
      setTimeout(() => {
        setOffTransition(false);
        setCurIndex(slides.length - 2);
      }, 10);
    }
  }, [transition]);

  // height 조절
  // CSS로 조절하는 더 좋은 방법이 생각나면 추후 수정하겠습니다 (ㅠㅠ)
  const carouselRef = React.useRef<HTMLDivElement | null>(null);
  const [carouselHeight, setCarouselHeight] = useState(0);

  React.useEffect(() => {
    const handleResize = () => {
      if (carouselRef.current) {
        const width = carouselRef.current.offsetWidth;
        setCarouselHeight(width);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <React.Fragment>
      <S.Container style={{ height: `${carouselHeight}px` }}>
        {/* 왼쪽(뒤로) */}
        <S.CircleBtn
          dir="left"
          disabled={disabled}
          onClick={() => {
            handleSlide(curIndex - 1);
            setDisabled(true);
            setTimeout(() => setDisabled(false), 300);
          }}
        >
          <Arrow />
        </S.CircleBtn>

        {/* 캐러셀*/}
        <S.Carousel
          ref={carouselRef}
          style={{
            transform: `translateX(${-100 * curIndex}%)`,
            height: `${carouselHeight}px`,
          }}
        >
          {slides.map((image: string, i: number) => (
            <S.Image key={i} src={image} />
          ))}
        </S.Carousel>

        {/* 오른쪽(앞으로) */}
        <S.CircleBtn
          dir="right"
          disabled={disabled}
          onClick={() => {
            handleSlide(curIndex + 1);
            setDisabled(true);
            setTimeout(() => setDisabled(false), 300);
          }}
        >
          <Arrow />
        </S.CircleBtn>
      </S.Container>

    </React.Fragment>
  );
};

export default Carousel;

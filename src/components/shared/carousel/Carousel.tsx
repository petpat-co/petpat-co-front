import React from 'react';
import * as S from './Carousel.style';

interface PropsType {
  imageList: Array<string>;
}

const Carousel = (props: PropsType) => {
  const { imageList } = props;

  // transition on/off
  const [offTransition, setOffTransition] = React.useState(false);
  // 현재 머무르고 있는 image index
  const [curIndex, setCurIndex] = React.useState(0);

  console.log(curIndex);

  const setSliders = () => {
    const addedData = [];

    for (let i = 0; i < imageList.length + 1; i++) {
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

  return (
    <React.Fragment>
      <button
        disabled={disabled}
        onClick={() => {
          handleSlide(curIndex - 1);
          setDisabled(true);
          setTimeout(() => setDisabled(false), 300);
        }}
      >
        뒤로
      </button>
      <S.Container>
        <S.Carousel
          style={{
            transform: `translateX(${-100 * curIndex}%)`,
            transition,
          }}
        >
          {slides.map((image: string, i: number) => (
            <S.Image key={i} src={image} />
          ))}
        </S.Carousel>
      </S.Container>
      <button
        disabled={disabled}
        onClick={() => {
          handleSlide(curIndex + 1);
          setDisabled(true);
          setTimeout(() => setDisabled(false), 300);
        }}
      >
        앞으로
      </button>
    </React.Fragment>
  );
};

export default Carousel;

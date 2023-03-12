import { Swiper, SwiperSlide } from 'swiper/react';
// import required modules
import { MainImages } from 'src/asset/main';
import styled from 'styled-components';
import { Mousewheel, Pagination } from 'swiper';
import 'swiper/css';
import 'swiper/css/pagination';
import { v4 } from 'uuid';

export const Banner = () => {
  const settings = {
    spaceBetween: 30,
    slidesPerView: 1,
    initialSlide: 0,
    observeParents: true, //이벤트 방지
    observeSlideChildren: true, //이벤트 방지
    observer: true,
    loop: false,
    loopedSlides: 1,
    pagination: {
      clickable: true,
    },
  };
  const imgList = [MainImages.mainTop, MainImages.mainTop, MainImages.mainTop];

  return (
    <BannerWrap>
      <Swiper
        direction={'vertical'}
        {...settings}
        modules={[Mousewheel, Pagination]}
      >
        {imgList.map((el) => {
          return (
            <SwiperSlide key={v4()}>
              <img src={el} alt={'강아지 이미지'} />
            </SwiperSlide>
          );
        })}
      </Swiper>
    </BannerWrap>
  );
};

const BannerWrap = styled.div`
  width: 100%;
  height: 1107px;

  & .swiper-wrapper {
    width: 100%;
    height: 1107px;
  }
  & .swiper-pagination-bullets {
    box-sizing: border-box;
    width: 15px;
    height: 135px;
    right: 100px !important;
    text-align: center !important;
    bottom: 100px !important;
  }
  & .swiper-pagination-bullet {
    width: 15px;
    height: 15px;
    margin: 0 0 15px 0 !important;
    background: #fff !important;
    transition: all 0.25s ease-out;
  }
  & .swiper-pagination-bullet-active {
    width: 15px;
    height: 45px;
    border-radius: 50px;
    background: ${({ theme }) => theme.colors.main}!important;
  }
`;

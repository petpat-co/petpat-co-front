import React from 'react';
import * as S from './DetailTemplate.style';
import Carousel from '../carousel/Carousel';

interface PropsType {
  
}

const DetailTemplate = (props: PropsType) => {
  return (
    <S.Container>
      <Carousel imageList={IMAGES}></Carousel>
    </S.Container>
  );
};

export default DetailTemplate;


const IMAGES = [
  'https://img.freepik.com/free-photo/cute-spitz_144627-7076.jpg?w=826&t=st=1704618236~exp=1704618836~hmac=af87e5330a94e6f2630efa6b584e2e66d33d5497c41cb255bb6405b4ed0e2ece',
  'https://img.freepik.com/free-photo/pug-dog-isolated-white-background_2829-11416.jpg?w=826&t=st=1704618251~exp=1704618851~hmac=77bf4d816a3cecd5df7cf368cc306eef7433d0cdfe8fb271e5c34842bfd064f9',
  'https://img.freepik.com/free-photo/cute-golden-retriever_144627-26658.jpg?w=740&t=st=1704618272~exp=1704618872~hmac=5be40517a07eda72e8424d61f08e7afb24b1c480d11f2235a10184083eb9f9ae',
  'https://img.freepik.com/premium-photo/cute-puppies-pomeranian-mixed-breed-pekingese-dog-run-grass-with-happiness_34266-1082.jpg?w=900',
  'https://img.freepik.com/free-photo/front-view-adorable-shiba-inu-dog_23-2149457807.jpg?size=626&ext=jpg&ga=GA1.1.549176277.1704618225&semt=sph',
  'https://img.freepik.com/premium-photo/dog-breed-pomeranian-spitz-funny-stands-red-background_810623-1359.jpg?size=626&ext=jpg&ga=GA1.1.549176277.1704618225&semt=sph',
]
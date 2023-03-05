import { memo } from 'react';
import { MainImages } from 'src/asset/main';
import { MainTemplateStyle as S } from './MainTemplate.style';

const MainTemplate = () => {
  return (
    <S.Wrap>
      <S.TopImgBox>
        <img src={MainImages.mainTop} alt={'강아지 이미지'} />

        <S.SubIntro>
          예비, 현역 댕댕냥냥 집사님들 어서오세요. 펫팻과 어떻게 친해져야 할 지
          궁금하시죠? 저희가 펫팻을 천천히 소개시켜 드릴게요!
        </S.SubIntro>
      </S.TopImgBox>
    </S.Wrap>
  );
};

export default memo(MainTemplate);

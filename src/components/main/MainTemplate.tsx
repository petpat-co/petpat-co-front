import { memo } from 'react';
import { Banner } from './Banner';

import { MainTemplateStyle as S } from './MainTemplate.style';

const MainTemplate = () => {
  return (
    <S.Wrap>
      <S.TopImgBox>
        <Banner />

        <S.SubIntro>
          예비, 현역 댕댕냥냥 집사님들 어서오세요. 펫팻과 어떻게 친해져야 할 지
          궁금하시죠? 저희가 펫팻을 천천히 소개시켜 드릴게요!
        </S.SubIntro>
      </S.TopImgBox>
    </S.Wrap>
  );
};

export default memo(MainTemplate);

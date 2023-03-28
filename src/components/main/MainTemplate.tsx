import { memo } from 'react';
import { ArrowIcon } from 'src/asset/arrow';
import { MainImages } from 'src/asset/main';
import { Button, DisplayGrid } from '../shared/element';
import { Text } from '../shared/element/Text';
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
      <S.SectionWrap>
        <S.SectionInner>
          <Text
            textStyle={{
              fontSize: '40px',
              fontWeight: '700',
              lineHeight: '130%',
            }}
          >
            펫팻 초심자에게 추천!
          </Text>
          <S.SectionContentsWrap>
            <S.MbtiBox url={MainImages.dogCatPic}>
              <div>
                <DisplayGrid height="104px">
                  <Text
                    textStyle={{
                      padding: '20px 0 0',
                      fontSize: '32px',
                      fontWeight: '700',
                      lineHeight: '130%',
                    }}
                  >
                    {'나와 딱 맞는\n반려동물은?'}
                  </Text>
                  <ArrowIcon.North iconStyles={{ size: '32', color: '#000' }} />
                </DisplayGrid>
                <Text
                  textStyle={{
                    margin: '62px 0 0',
                    fontSize: '16px',
                    lineHeight: '150%',
                  }}
                >
                  {
                    '나와 잘 맞는 반려동물은\n누가 있을지 테스트를 통해\n찾아보는 건어떨까요?'
                  }
                </Text>
              </div>
              <DisplayGrid width="345px" height="42px">
                <Button
                  isFlex={true}
                  width="122px"
                  border="1px solid #000"
                  _onClick={() => {}}
                  _disabled={false}
                  activeBg="#0047FF"
                  padding="8px 20px"
                  radius="30px"
                >
                  <Text textStyle={{ fontSize: '18px' }}>동물 MBTI</Text>
                </Button>
                <Button
                  isFlex={true}
                  width="207px"
                  border="1px solid #000"
                  _onClick={() => {}}
                  _disabled={false}
                  activeBg="#F35F4C"
                  padding="8px 20px"
                  radius="30px"
                >
                  <Text textStyle={{ fontSize: '18px' }}>
                    댕냥이와 나의 궁합은?
                  </Text>
                </Button>
              </DisplayGrid>
            </S.MbtiBox>
            <S.TipWrap>
              <DisplayGrid height="376px">
                <S.Beginner>
                  <DisplayGrid height="146px">
                    <Text
                      textStyle={{
                        padding: '20px 0 0',
                        fontSize: '32px',
                        fontWeight: '700',
                        lineHeight: '130%',
                        color: '#fff',
                      }}
                    >
                      {'반려동물과\n함께 하기 전\n알아둬야 할 사항'}
                    </Text>
                    <ArrowIcon.North
                      iconStyles={{ size: '32', color: '#000' }}
                    />
                  </DisplayGrid>
                  <Button
                    isFlex={true}
                    width="177px"
                    border="1px solid #000"
                    _onClick={() => {}}
                    _disabled={false}
                    activeBg="#F35F4C"
                    padding="8px 20px"
                    radius="30px"
                  >
                    <Text textStyle={{ fontSize: '18px' }}>
                      현직 집사들의 꿀팁
                    </Text>
                  </Button>
                </S.Beginner>
                <S.PictureBox url={MainImages.feedPic}>
                  <Text
                    textStyle={{
                      padding: '20px 0 0',
                      fontSize: '32px',
                      fontWeight: '700',
                      lineHeight: '130%',
                      color: '#fff',
                    }}
                  >
                    {'반려동물에 따라\n꼭 필요한 물품들'}
                  </Text>
                  <ArrowIcon.North iconStyles={{ size: '32', color: '#000' }} />
                </S.PictureBox>
              </DisplayGrid>
              <S.MousePicBox url={MainImages.mousePic}>
                <DisplayGrid height="106px">
                  <Text
                    textStyle={{
                      padding: '20px 0 0',
                      fontSize: '32px',
                      fontWeight: '700',
                      lineHeight: '130%',
                      color: '#000',
                    }}
                  >
                    {'펫팻에서\n필요한 물품 찾아봐요!'}
                  </Text>
                  <ArrowIcon.North iconStyles={{ size: '32', color: '#000' }} />
                </DisplayGrid>
                <DisplayGrid width="376px" height="42px">
                  <Button
                    isFlex={true}
                    width="auto"
                    border="1px solid #000"
                    _onClick={() => {}}
                    _disabled={false}
                    activeBg="#F35F4C"
                    padding="8px 20px"
                    radius="30px"
                  >
                    <Text textStyle={{ fontSize: '18px', fontWeight: '700' }}>
                      와 정말 새것같다!
                    </Text>
                  </Button>
                  <Button
                    isFlex={true}
                    width="auto"
                    border="1px solid #000"
                    _onClick={() => {}}
                    _disabled={false}
                    activeBg="#0047FF"
                    padding="8px 20px"
                    radius="30px"
                  >
                    <Text textStyle={{ fontSize: '18px', fontWeight: '700' }}>
                      무료나눔도 있어요
                    </Text>
                  </Button>
                </DisplayGrid>
              </S.MousePicBox>
            </S.TipWrap>
          </S.SectionContentsWrap>
        </S.SectionInner>
      </S.SectionWrap>
    </S.Wrap>
  );
};

export default memo(MainTemplate);

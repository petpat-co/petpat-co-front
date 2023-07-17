import React, { ReactElement } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'src/core/store';
// component
import ModifyUserProfile from './ModifyUserProfile';
// style, elements
import { MyPageTemplateStyle as S } from './MyPageTemplate.style';
import { Button, Text } from '../../shared/element';
import SignOut from '../SignOut';
import MyPost from './MyPost';

const MyPageTemplate = (): ReactElement => {
  const defaultProfile = useSelector((state: RootState) => state.user.user);
  const [tapName, setTapName] = React.useState('main');

  const onClickModifyProfile = () => {};
  const onClickTradingNow = () => {};
  const onClickReviews = () => {};
  const onClickRecentPost = () => {};

  const tapList: { [key: string]: any } = {
    modify: <ModifyUserProfile />,
    mypost: <MyPost></MyPost>,
    trade: <></>,
    qna: <></>,
    like: <></>,
    signout: <></>,
  };


  // styles
  const ButtonStyle = {
    margin: '12px',
    padding: '0 20px',
    width: 'fit-content',
    height: '42px',
    border: '1px solid black',
    radius: '30px',
    fontSize: '18px',
    fontWeight: '700',
  };
  const TextStyle = {
    colors: 'primary',
    fontSize: '18px',
    fontWeight: '700',
  };
  const MenuStyle = {
    margin: '12px 0',
    padding: '0',
    width: 'fit-content',
    height: 'fit-content',
  };

  return (
    <S.Wrap>
      {/* profile section */}

      <S.UserProfileSection>
        <S.UserProfileImg img={defaultProfile.userImg} />
        <S.UserInfo>
          <Text textStyle={{ size: 'small', colors: 'coolgray400' }}>
            {defaultProfile.userEmail}
          </Text>
          <Text textStyle={{ size: 'title', fontWeight: 'bold' }}>
            {defaultProfile.userNickname} 님
          </Text>
        </S.UserInfo>
        <Button
          {...ButtonStyle}
          _onClick={onClickModifyProfile}
          margin="0 40px"
        >
          프로필 수정
        </Button>
        <S.Buttons>
          <Button isFlex {...ButtonStyle} _onClick={onClickTradingNow}>
            거래 진행
            <Text textStyle={{ ...TextStyle }}>{' 2'}</Text>
          </Button>
          <Button isFlex {...ButtonStyle} _onClick={onClickReviews}>
            리뷰
            <Text textStyle={{ ...TextStyle }}>{' 2'}</Text>
          </Button>
          <Button isFlex {...ButtonStyle} _onClick={onClickRecentPost}>
            최근 본 글<Text textStyle={{ ...TextStyle }}>{' 2'}</Text>
          </Button>
        </S.Buttons>
      </S.UserProfileSection>

      {/* menu section */}

      <S.BottomSection>
        <S.MenuSection>
          <S.ButtonAlign>
            <Text
              textStyle={{
                margin: '12px 0',
                size: 'xlarge',
                fontWeight: '700',
              }}
            >
              나의 계정설정
            </Text>
            <Button
              {...MenuStyle}
              _disabled={false}
              _onClick={() => {
                setTapName('modify');
              }}
            >
              프로필 수정
            </Button>
            <Button
              {...MenuStyle}
              _disabled={false}
              _onClick={() => {
                setTapName('rehoming');
              }}
            >
              비밀번호 변경
            </Button>
            <Text
              textStyle={{
                margin: '80px 0 12px 0',
                size: 'xlarge',
                fontWeight: '700',
              }}
            >
              나의 활동정보
            </Text>
            <Button
              {...MenuStyle}
              _disabled={false}
              _onClick={() => {
                setTapName('mypost');
              }}
            >
              내가 작성한 게시글
            </Button>
            <Button
              {...MenuStyle}
              _disabled={false}
              _onClick={() => {
                setTapName('mypost');
              }}
            >
              내가 남긴 댓글
            </Button>
            <Button
              {...MenuStyle}
              _disabled={false}
              _onClick={() => {
                setTapName('like');
              }}
            >
              내가 좋아요 한 글
            </Button>
            <Button
              {...MenuStyle}
              _disabled={false}
              _onClick={() => {
                setTapName('signout');
              }}
            >
              내가 북마크 한 글
            </Button>
          </S.ButtonAlign>
        </S.MenuSection>

        {/* selected tap section */}

        <S.SelectedMenuSection>
          <Text>선택된 탭</Text>
          {tapList[tapName]}
        </S.SelectedMenuSection>
      </S.BottomSection>
    </S.Wrap>
  );
};

export default MyPageTemplate;

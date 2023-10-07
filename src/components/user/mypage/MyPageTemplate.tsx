import React, { ReactElement } from 'react';
import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from 'src/core/store';
import { useLocation, useNavigate } from 'react-router-dom';
// style, elements
import { MyPageTemplateStyle as S } from './MyPageTemplate.style';
import { Button, Text } from '../../shared/element';
// component
import MyPost from './MyPost';
import ModifyUserProfile from './ModifyUserProfile';
import ChangePassword from './ChangePassword';
import DeleteAccount from '../DeleteAccount';
import MyRehomingList from './listmenu/MyRehomingList';
import MyCommentList from './listmenu/MyCommentList';
import MyQnaList from './listmenu/MyQnaList';
import MyLikeList from './listmenu/MyLikeList';
import MyBookmarkList from './listmenu/MyBookmarkList';
import MyTradeList from './listmenu/MyTradeList';
import { getProfileApi } from 'src/core/redux/user/userSlice';

const MyPageTemplate = (): ReactElement => {
  const appdispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation().pathname.split('/')[2];

  const defaultProfile = useSelector((state: RootState) => state.user.user);
  const [tapName, setTapName] = React.useState('main');

  const onClickModifyProfile = () => {};
  const onClickTradingNow = () => {};
  const onClickReviews = () => {};
  const onClickRecentPost = () => {};

  const tapList: { [key: string]: any } = {
    main: <MyPost setTapName={setTapName}/>,
    update: <ModifyUserProfile />,
    cpw: <ChangePassword />,
    rehoming: <MyRehomingList />,
    trade: <MyTradeList />,
    qna: <MyQnaList />,
    comment: <MyCommentList />,
    like: <MyLikeList />,
    bookmark: <MyBookmarkList />,
    delete: <DeleteAccount></DeleteAccount>,
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

  React.useEffect(() => {
    switch (location) {
      case undefined:
        break;
      case 'update':
        setTapName('update');
        break;
      case 'cpw':
        setTapName('cpw');
        break;
      case 'rehoming':
        setTapName('rehoming');
        break;
      case 'trade':
        setTapName('trade');
        break;
      case 'qna':
        setTapName('qna');
        break;
      case 'comment':
        setTapName('comment');
        break;
      case 'like':
        setTapName('like');
        break;
      case 'bookmark':
        setTapName('bookmark');
        break;
      case 'delete':
        setTapName('delete');
        break;
      // default:
      //   window.alert('문제가 발생했습니다.');
      //   navigate('/mypage');
    }
  }, [location, navigate]);

  React.useEffect(() => {
    appdispatch(getProfileApi(''));
  }, [])


  return (
    <S.Wrap>
      {/* profile section */}

      <S.UserProfileSection>
        <S.UserProfileImg img={defaultProfile.profileImgUrl} />
        <S.UserInfo>
          <Text textStyle={{ size: 'small', colors: 'coolgray400' }}>
            {defaultProfile.userEmail}
          </Text>
          <Text textStyle={{ size: 'title', fontWeight: 'bold' }}>
            {defaultProfile.nickname} 님
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
                navigate('/mypage/account/update');
                setTapName('update');
              }}
            >
              프로필 수정
            </Button>
            <Button
              {...MenuStyle}
              _disabled={false}
              _onClick={() => {
                navigate('/mypage/account/cpw');
                setTapName('cpw');
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
                navigate('/mypage/post/rehoming');
                setTapName('rehoming');
              }}
            >
              내가 작성한 분양 게시글
            </Button>
            <Button
              {...MenuStyle}
              _disabled={false}
              _onClick={() => {
                navigate('/mypage/post/trade');
                setTapName('trade');
              }}
            >
              내가 작성한 판매 게시글
            </Button>
            <Button
              {...MenuStyle}
              _disabled={false}
              _onClick={() => {
                navigate('/mypage/post/qna');
                setTapName('qna');
              }}
            >
              내가 남긴 질문 게시글
            </Button>
            <Button
              {...MenuStyle}
              _disabled={false}
              _onClick={() => {
                navigate('/mypage/post/comment');
                setTapName('comment');
              }}
            >
              내가 남긴 댓글
            </Button>
            <Button
              {...MenuStyle}
              _disabled={false}
              _onClick={() => {
                navigate('/mypage/post/like');
                setTapName('like');
              }}
            >
              내가 좋아요 한 글
            </Button>
            <Button
              {...MenuStyle}
              _disabled={false}
              _onClick={() => {
                navigate('/mypage/post/bookmark');
                setTapName('bookmark');
              }}
            >
              내가 북마크 한 글
            </Button>
            <Button
              {...MenuStyle}
              _disabled={false}
              _onClick={() => {
                navigate('/mypage/account/delete');
                setTapName('delete');
              }}
            >
              회원 탈퇴
            </Button>
          </S.ButtonAlign>
        </S.MenuSection>

        {/* selected tap section */}

        <S.SelectedMenuSection>{tapList[tapName]}</S.SelectedMenuSection>
      </S.BottomSection>
    </S.Wrap>
  );
};

export default MyPageTemplate;

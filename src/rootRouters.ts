import GoodsTrade from './pages/GoodsTrade';
import MainHome from './pages/MainHome';
import ReHomingDetail from './pages/rehome/detail/ReHomingDetail';
import ReHoming from './pages/rehome/ReHoming';
import ReHomingWrite from './pages/rehome/ReHomingWrite';
import LogIn from './pages/user/LogIn';
import QnA from './pages/qna/QnA';
import QnaDetail from './components/qna/QnaDetail';
import QnaWrite from './components/qna/QnaWrite';
import MyPage from './pages/user/MyPage';
import FindPassword from './components/user/FindPassword';
import SignUp from './pages/user/SignUp';
import Kakao from './components/user/Kakao';

// eslint-disable-next-line import/no-anonymous-default-export
export default [
  {
    path: '/',
    element: MainHome,
  },
  {
    path: '/rehome',
    element: ReHoming,
  },
  {
    path: '/rehome/write',
    element: ReHomingWrite,
  },
  {
    path: '/rehome/detail/:postId',
    element: ReHomingDetail,
  },
  {
    path: '/trade',
    element: GoodsTrade,
  },
  {
    path: '/login',
    element: LogIn,
  },
  {
    path: '/signup',
    element: SignUp,
  },
  {
    path: '/mypage',
    element: MyPage,
  },
  {
    path: '/qna',
    element: QnA,
  },
  {
    path: '/qna/detail/:postId',
    element: QnaDetail,
  },
  {
    path: '/qna/write',
    element: QnaWrite,
  },
  {
    path: '/mypage/account/update',
    element: MyPage,
  },
  {
    path: '/mypage/post/rehoming',
    element: MyPage,
  },
  {
    path: '/mypage/post/trade',
    element: MyPage,
  },
  {
    path: '/mypage/post/qna',
    element: MyPage,
  },
  {
    path: '/mypage/post/comment',
    element: MyPage,
  },
  {
    path: '/mypage/post/like',
    element: MyPage,
  },
  {
    path: '/mypage/post/bookmark',
    element: MyPage,
  },
  {
    path: '/mypage/account/cpw',
    element: MyPage,
  },
  {
    path: '/mypage/account/delete',
    element: MyPage,
  },
  {
    path: '/user/account/fpw',
    element: FindPassword,
  },
  {
    path: '/user/kakao/callback',
    element: Kakao,
  },
];

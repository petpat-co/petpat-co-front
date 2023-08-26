import Kakao from 'src/pages/user/Kakao';
import GoodsTrade from './pages/GoodsTrade';
import MainHome from './pages/MainHome';
import ReHomingDetail from './pages/rehome/detail/ReHomingDetail';
import ReHoming from './pages/rehome/ReHoming';
import ReHomingWrite from './pages/rehome/ReHomingWrite';

import LogIn from './pages/user/LogIn';
import MyPage from './pages/user/MyPage';
import FindPassword from './components/user/FindPassword';
import Kakao from './components/user/Kakao';
import ChangePassword from './components/user/mypage/ChangePassword';
import SignUp from './pages/user/SignUp';

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

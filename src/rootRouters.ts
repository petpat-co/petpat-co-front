import GoodsTrade from './pages/GoodsTrade';
import MainHome from './pages/MainHome';
import ReHomingDetail from './pages/rehome/detail/ReHomingDetail';
import ReHoming from './pages/rehome/ReHoming';
import ReHomingWrite from './pages/rehome/ReHomingWrite';
import Kakao from 'src/pages/user/Kakao';

import LogIn from './pages/user/LogIn';
import SignUp from './pages/user/SignUp'
import MyPage from './pages/user/MyPage';

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
    path: '/user/kakao/callback',
    element: Kakao,
  },
  {
    path: '/mypage',
    element: MyPage,
  },
  // {
  //   path: '/qna',
  //   element: QnA,
  // },
  // {
  //   path: '/qna/write',
  //   element: QnaWrite,
  // },
];

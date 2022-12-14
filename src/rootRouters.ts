import GoodsTrade from './pages/GoodsTrade';
import MainHome from './pages/MainHome';
import QnA from './pages/qna/QnA';
import QnaWrite from './pages/qna/write/QnaWrite';
import ReHomingDetail from './pages/rehome/detail/ReHomingDetail';
import ReHoming from './pages/rehome/ReHoming';
import ReHomingWrite from './pages/rehome/ReHomingWrite';

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
    path: '/qna',
    element: QnA,
  },
  {
    path: '/qna/write',
    element: QnaWrite,
  },
];

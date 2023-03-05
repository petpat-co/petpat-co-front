import { lazy, ReactElement, Suspense } from 'react';

const MainTemplate = lazy(() => import('src/components/main/MainTemplate'));

const MainHome = (): ReactElement => {
  return (
    <Suspense fallback={<p> 로딩중...</p>}>
      <MainTemplate />
    </Suspense>
  );
};

export default MainHome;

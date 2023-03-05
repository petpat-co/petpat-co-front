import { Route, Routes } from 'react-router-dom';
import Footer from './components/shared/footer/Footer';
import Header from './components/shared/header/Header';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { v4 } from 'uuid';
import routeList from './rootRouters';
const Root = () => {
  return (
    <>
      <Header />
      <Routes>
        {routeList.map((item, idx) => {
          return (
            <Route key={v4()} path={item.path} element={<item.element />} />
          );
        })}
      </Routes>
      <Footer />
    </>
  );
};

export default Root;

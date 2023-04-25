import { Route, Routes } from 'react-router-dom';
import Footer from './components/shared/footer/Footer';
import Header from './components/shared/header/Header';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { v4 } from 'uuid';
import ModalController from './components/common/modal/controller';
import Wrapper from './components/shared/element/Wrapper';
import routeList from './rootRouters';

const Root = () => {
  return (
    <>
      <Header />
      <Wrapper>
        <Routes>
          {routeList.map((item, idx) => {
            return (
              <Route key={v4()} path={item.path} element={<item.element />} />
            );
          })}
        </Routes>
      </Wrapper>
      <Footer />
      <ModalController />
    </>
  );
};

export default Root;

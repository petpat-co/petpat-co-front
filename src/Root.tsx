import { Route, Routes } from 'react-router-dom';
import Footer from './components/shared/footer/Footer';
import Header from './components/shared/header/Header';
import GoodsTrade from './pages/GoodsTrade';
import MainHome from './pages/MainHome';
import QnA from './pages/qna/QnA';
import ReHoming from './pages/rehome/ReHoming';
import ReHomingWrite from './pages/rehome/ReHomingWrite';

const Root = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<MainHome />} />
        <Route path="/rehome" element={<ReHoming />} />
        <Route path="/rehome/write" element={<ReHomingWrite />} />
        <Route path="/trade" element={<GoodsTrade />} />
        <Route path="/qna" element={<QnA />} />
      </Routes>
      <Footer />
    </>
  );
};

export default Root;

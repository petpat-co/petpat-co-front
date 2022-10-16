import { Route, Routes } from "react-router-dom";
import GoodsTrade from "./pages/GoodsTrade";
import MainHome from "./pages/MainHome";
import ReHoming from "./pages/ReHoming";

const Root = () => {
  return (
    <Routes>
      <Route path="/" element={<MainHome />} />
      <Route path="/rehome" element={<ReHoming />} />
      <Route path="/trade" element={<GoodsTrade />} />
    </Routes>
  );
};

export default Root;

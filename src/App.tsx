import React from "react";
import { ThemeProvider } from "styled-components";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import { useDispatch } from "react-redux";
//css
import GlobalStyle from "./styles/GlobalStyles";
import theme from "./styles/theme";
import ReHoming from "./pages/ReHoming";
import MainHome from "./pages/MainHome";
function App() {
  const dispatch = useDispatch();

  return (
    <>
      <BrowserRouter>
        <GlobalStyle />
        <ThemeProvider theme={theme}>
          <Routes>
            <Route path="/" element={<MainHome />} />
            <Route path="/rehome" element={<ReHoming />} />
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </>
  );
}

export default App;

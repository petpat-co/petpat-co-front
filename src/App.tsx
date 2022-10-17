import React from "react";
import { ThemeProvider } from "styled-components";
import { BrowserRouter } from "react-router-dom";
import { useDispatch } from "react-redux";
//css
import GlobalStyle from "./styles/GlobalStyles";
import theme from "./styles/theme";
import Root from "./Root";
function App() {
  const dispatch = useDispatch();

  return (
    <>
      <BrowserRouter>
        <GlobalStyle />
        <ThemeProvider theme={theme}>
          <Root />
        </ThemeProvider>
      </BrowserRouter>
    </>
  );
}

export default App;

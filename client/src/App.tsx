import React from "react";
import styled, { ThemeProvider } from "styled-components";
import { theme } from "./themes";
import { Button } from "./components/Button";

export const AppContainer = styled.div`
  background-color: ${props => props.theme.light};
  display: grid;
  grid-template: 100% / 67% 33%;
`;

function App() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <AppContainer>
        </AppContainer>
      </ThemeProvider>
    </>
  );
}

export default App;

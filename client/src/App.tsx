import React from "react";
import styled, { ThemeProvider } from "styled-components";
import { theme } from "./themes";
import { Button } from "./components/Button";

export const AppContainer = styled.div`
  background-color: ${props => props.theme.light};
`;

function App() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <AppContainer>
          <Button intent="PRIMARY">hi</Button>
        </AppContainer>
      </ThemeProvider>
    </>
  );
}

export default App;

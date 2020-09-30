import React from "react";
import { Button } from "./index";
import styled, { ThemeProvider } from "styled-components";
import { theme } from "../../themes";

export default {
  title: "Components/Button",
  component: Button
};

const ButtonContainer = styled.div`
  display:flex; 
  justify-content: space-around;
  margin:auto;
  width 400px;
  margin-top: 40px;
`
export const Primary: React.SFC<{}> = () => (
  <ThemeProvider theme={theme}>
    <ButtonContainer>
      <Button intent="PRIMARY">hi</Button>
      <Button intent="SECONDARY">hi</Button>
      <Button intent="NONE">hi</Button>
    </ButtonContainer>
    <ButtonContainer>
      <Button intent="PRIMARY">this is a long button</Button>
    </ButtonContainer>
  </ThemeProvider>
);

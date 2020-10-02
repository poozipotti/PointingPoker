import React from "react"; import { TextInput } from "./index";
import styled, { ThemeProvider } from "styled-components";
import { theme } from "../../themes";

export default {
  title: "Components/TextInput",
  component: TextInput
};

const TextInputContainer = styled.div`
  margin:auto;
  margin-top: 40px;
  & > div {
    margin-top: 20px;
  }

`
export const Primary: React.SFC<{}> = () => (
  <ThemeProvider theme={theme}>
    <TextInputContainer style={{width:'200px'}}> 
      <TextInput placeholder='input here'/>
    </TextInputContainer>
  </ThemeProvider>
);

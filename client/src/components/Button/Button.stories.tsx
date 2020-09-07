import React from "react";
import { Button } from "./index";
import { ThemeProvider } from "styled-components";
import { theme } from "../../themes";

export default {
  title: "Components/Button",
  component: Button
};

export const Primary: React.SFC<{}> = () => (
  <ThemeProvider theme={theme}>
      <Button intent="PRIMARY">hi</Button>
      <Button intent="SECONDARY">hi</Button>
      <Button intent="NONE">hi</Button>
  </ThemeProvider>
);

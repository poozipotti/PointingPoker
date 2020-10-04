import React from "react";
import { InfoPanel } from "./index";
import { ThemeProvider } from "styled-components";
import { theme } from "../../themes";

export default {
  title: "Layouts/InfoPanel",
  component: InfoPanel,
};

export const Primary: React.SFC<{}> = () => (
  <ThemeProvider theme={theme}>
    <InfoPanel roomName={"test room"} />
  </ThemeProvider>
);

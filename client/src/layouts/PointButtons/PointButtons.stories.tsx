import React from "react";
import { PointButtons } from "./index";
import { ThemeProvider } from "styled-components";
import { theme } from "../../themes";

export default {
  title: "Layouts/PointButtons",
  component: PointButtons
};

export const Primary: React.SFC<{}> = () => (
  <ThemeProvider theme={theme}>
    <PointButtons pointValues={[1,2,3,4,5,6,7,8,9,10]}/>
  </ThemeProvider>
);

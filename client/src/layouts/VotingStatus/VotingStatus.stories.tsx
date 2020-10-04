import React from "react";
import { VotingStatus } from "./index";
import { ThemeProvider } from "styled-components";
import { theme } from "../../themes";

export default {
  title: "Layouts/VotingStatus",
  component: VotingStatus
};

export const Primary: React.SFC<{}> = () => (
  <ThemeProvider theme={theme}>
    <VotingStatus voters={
        {
          "george":{status:true},
          "max":{status:false},
          "doug":{status:null},
          "anne":{status:false},
        }
      }
    />
  </ThemeProvider>
);
export const Voted: React.SFC<{}> = () => (
  <ThemeProvider theme={theme}>
    <VotingStatus voters={
        {
          "george":{status:true,voteValue:10},
          "max":{status:false,voteValue:12},
          "doug":{status:null,voteValue:2},
          "anne":{status:false,voteValue:3},
        }
      }
    />
  </ThemeProvider>
);

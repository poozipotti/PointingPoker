import React from "react";
import { VoterCard } from "./index";
import styled, { ThemeProvider } from "styled-components";
import { theme } from "../../themes";

export default {
  title: "Components/VoterCard",
  component: VoterCard
};

const VoterCardContainer = styled.div`
  margin:auto;
  margin-top: 40px;
  & > div {
    margin-top: 20px;
  }

`
export const Primary: React.SFC<{}> = () => (
  <ThemeProvider theme={theme}>
    <VoterCardContainer style={{width:'100px'}}> 
      <VoterCard name="George" isVoting={false} hasCompleted={false}/>
      <VoterCard name="George" isVoting={true} hasCompleted={true}/>
      <VoterCard name="George" isVoting={true} hasCompleted={true}/>
    </VoterCardContainer>
    <VoterCardContainer style={{width:'200px'}}> 
      <VoterCard name="George" isVoting={false} hasCompleted={false}/>
      <VoterCard name="George" isVoting={true} hasCompleted={false}/>
      <VoterCard name="George" isVoting={true} hasCompleted={true}/>
    </VoterCardContainer>
    <VoterCardContainer style={{width:'300px'}}> 
      <VoterCard name="George" isVoting={false} hasCompleted={false}/>
      <VoterCard name="George" isVoting={true} hasCompleted={false}/>
      <VoterCard name="George" isVoting={true} hasCompleted={true}/>
    </VoterCardContainer>
  </ThemeProvider>
);

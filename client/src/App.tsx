import React from "react";
import styled, { ThemeProvider } from "styled-components";
import { theme } from "./themes";
import {InfoPanel} from "./layouts/InfoPanel";
import {PointButtons} from "./layouts/PointButtons";
import {VoterCard} from "./components/VoterCard";
import {VotingStatus} from "./layouts/VotingStatus";

export const AppContainer = styled.div`
  background-color: ${props => props.theme.light};
  display: grid;
  grid-template: 100% / 67% 33%;
  grid-column-gap: 100px;
  width:80%;
  margin:auto;
   
`;

function App() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <AppContainer>
            <div>          
              <InfoPanel roomName='Test Room'/>
              <PointButtons pointValues={[.5,1,2,5,8,9,15]} style={{marginTop:'150px'}}/>
            </div>
            <div>
              <VotingStatus voters={
                {
                  "george":{status:true},
                  "max":{status:false},
                  "doug":{status:null},
                  "anne":{status:false},
                }}

              />
            </div>
        </AppContainer>
      </ThemeProvider>
    </>
  );
}

export default App;

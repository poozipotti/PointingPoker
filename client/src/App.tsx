import React from "react";
import styled, { ThemeProvider } from "styled-components";
import { theme } from "./themes";
import {InfoPanel} from "./layouts/InfoPanel";
import {PointButtons} from "./layouts/PointButtons";
import {VotingStatus} from "./layouts/VotingStatus";

export const AppContainer = styled.div`
  background-color: ${props => props.theme.light};
  display: grid;
  grid-template: 100% / 2fr 1fr;
  width: 90%; 
  grid-column-gap: 300px;
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
                style={{marginTop:'5rem'}}

              />
            </div>
        </AppContainer>
      </ThemeProvider>
    </>
  );
}

export default App;

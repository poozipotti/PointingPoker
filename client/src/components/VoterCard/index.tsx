import React, {useContext} from "react";
import styled,{ThemeContext} from "styled-components";
import { Theme, Color } from "../../types";

interface VoterCardProps {
  name: string
  isVoting: boolean
  hasCompleted: boolean 
  completeColor?: string
  incompleteColor?: string
  notVotingColor?: string
}

const VoterContainer = styled.div`
  border-radius: 10px;
  width: 100%;
  border: 1px solid ${props => props.theme.dark[1]};
  font-size: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-left: 10%;
  padding-right: 10%;
  background-color: ${props => props.theme.light};
`;
const VotingStatusBox = styled.div<{color:string}>`
  background-color: ${props => props.color};
  width: 35px;
  height: 35px;
  border-radius: 10px;
  border: 1px solid ${props => props.theme.dark[1]};


`

export const VoterCard: React.FC<VoterCardProps> = (props) => {
  const theme:Theme = useContext(ThemeContext)
  const completeColor = props.completeColor || theme.primary[2];
  const incompleteColor = props.incompleteColor || theme.accent[2];
  const notVotingColor = props.incompleteColor || theme.dark[4];

  const displayColor = props.isVoting ? (props.hasCompleted ? completeColor : incompleteColor ) : notVotingColor 
  
  return <VoterContainer><p>{props.name}</p> <VotingStatusBox color={displayColor}/></VoterContainer>
};

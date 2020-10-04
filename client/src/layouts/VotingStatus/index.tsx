import React from "react";
import styled from "styled-components";
import { VoterCard } from "../../components/VoterCard";

interface VoterMap {
  [voterName: string]: { status: true | false | null; voteValue?: number };
}

interface ButtonProps {
  voters: VoterMap;
}

const VotingContainer = styled.div`
  display: Grid;
  grid-column-gap: 20px;
  grid-row-gap: 20px;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
`;
const Title = styled.h2`
  wdith: 100%;
  text-align: center;
  font-family: "Poppins", sans-serif;
  font-size: 2rem;
`;

export const VotingStatus: React.FC<ButtonProps> = (props) => {
  return (
    <>
      <Title>-Results-</Title>
      <VotingContainer>
        {Object.entries(props.voters)
          .filter(([, voteValue]) => voteValue.status !== null)
          .map(([voter, voteValue]) => (
            <VoterCard
              name={voter}
              isVoting={true}
              hasCompleted={voteValue.status || false}
              voteValue={voteValue.voteValue}
            />
          ))}
      </VotingContainer>
      <Title>-Observers-</Title>
      {Object.entries(props.voters)
        .filter(([, hasVoted]) => hasVoted.status === null)
        .map(([voter]) => (
          <VoterCard name={voter} isVoting={false} hasCompleted={false} />
        ))}
    </>
  );
};

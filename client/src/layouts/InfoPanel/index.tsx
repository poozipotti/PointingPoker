import React, {ChangeEvent, MouseEvent}  from "react";
import styled from "styled-components";
import { TextInput } from "../../components/TextInput";
import {CheckBox} from "../../components/CheckBox";

interface InfoPanelProps {
  roomName: string;
  storyDescription?: string;
  username?:string;
  changeUsername?: (e:ChangeEvent<HTMLInputElement>) => void
  shouldSkip?:boolean
  setShouldSkip?:(e:any)=>void

}

const VotingContainer = styled.div`
  display: Grid;
  grid-column-gap: 20px;
  grid-row-gap: 20px;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
`;
const DescriptionEditor = styled(TextInput)`
  font-size:2rem;
`

export const InfoPanel: React.FC<InfoPanelProps> = (props) => {
  const { roomName, storyDescription } = props;
  return (
    <div>
      <h1 style={{fontSize:'4rem'}}>{roomName}</h1>
      <div style={{display:'flex',alignItems:'center',marginTop:'90px'}}>
        <h2 style={{width:'20%'}}>Your Name: </h2>
        <DescriptionEditor placeholder="Jane Doe" value={props.username} onChange={props.changeUsername}/>
      </div>
      <div style={{display:'flex',alignItems:'center',justifyContent:'space-between'}}>
        <CheckBox label={'Skip Me'} style={{width:'30%'}} onclick={props.setShouldSkip} value={props.shouldSkip}/>
      </div>
    </div>
  );
};

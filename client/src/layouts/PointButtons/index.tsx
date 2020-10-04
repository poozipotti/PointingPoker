import React, {useState} from "react";
import styled from "styled-components";
import { Button } from "../../components/Button"

interface ButtonProps {
  pointValues: number[]
  selectedValue?: number
  onChange?: (newPointValue:number) => void
}

const ButtonsContainer = styled.div`
  display:Grid;
  grid-column-gap: 20px;
  grid-row-gap: 20px;
  grid-template-columns: repeat(auto-fill,minmax(200px,1fr));
`;


export const PointButtons: React.FC<ButtonProps> = props => {
  const {pointValues,selectedValue,onChange} = props;

  const [uncontrolledSelection,setUncontrolledSelection] = useState<undefined | number>(undefined)
  const selection = onChange !== undefined ? selectedValue : uncontrolledSelection;
  const changeSelection = onChange || ((newPointValue:number) => {setUncontrolledSelection(newPointValue)})

  return (
    <ButtonsContainer>
      {pointValues.map(
         pointValue => (
           <Button 
             intent={pointValue === selection ? "PRIMARY": "NONE"} 
             key={pointValue} 
             onClick={()=>{
               changeSelection(pointValue)
             }}
           >
             {pointValue} points
           </Button>
         )
      )} 
    </ButtonsContainer>
  );
};

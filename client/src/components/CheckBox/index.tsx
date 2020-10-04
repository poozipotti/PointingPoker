import React from "react";
import styled from "styled-components";

interface CheckBoxProps {
  label: string
  style: React.CSSProperties
}

const CheckboxContainer = styled.div`
  width: 100%;
  font-size: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 1.4rem;
  input[type=checkbox] {
    -ms-transform: scale(2); /* IE */
    -moz-transform: scale(2); /* FF */
    -webkit-transform: scale(2); /* Safari and Chrome */
    -o-transform: scale(2); /* Opera */
    transform: scale(2);
    padding: 10px;
  }
`;

export const CheckBox: React.FC<CheckBoxProps> = (props) => {
  return   (
    <CheckboxContainer style= {props.style}>
      <label>{props.label}</label> 
      <input type="checkbox" name="vehicle1" value="Bike"/>
    </CheckboxContainer>
  )
};

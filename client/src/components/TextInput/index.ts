import React, {useContext} from "react";
import styled,{ThemeContext} from "styled-components";

export const TextInput = styled.input`
  border-radius: 10px;
  width: 100%;
  border: 2px solid ${props => props.theme.dark[1]};
  font-size: 1.4rem;
  background-color: ${props => props.theme.light};
  padding-left: 10px;
  padding-right: 10px;
  
`

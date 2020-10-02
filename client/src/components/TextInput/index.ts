import React, {useContext} from "react";
import styled,{ThemeContext} from "styled-components";
import { Theme, Color } from "../../types";

export const TextInput = styled.input`
  border-radius: 10px;
  width: 100%;
  border: 1px solid ${props => props.theme.dark[1]};
  font-size: 1.4rem;
  background-color: ${props => props.theme.light};
  padding-left: 10%;
  padding-right: 10%;
  
`

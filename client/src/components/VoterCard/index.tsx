import React from "react";
import styled from "styled-components";
import { Theme, Color } from "../../types";

type Intent = "NONE" | "PRIMARY" | "SECONDARY";
interface ButtonProps {
  intent: Intent;
}

const intentToColor = (
  intent: Intent,
  theme: Theme,
  lightness: keyof Color
) => {
  switch (intent) {
    case "PRIMARY":
      return theme.primary[lightness];
    case "SECONDARY":
      return theme.accent[lightness];
    case "NONE":
      return theme.dark[lightness];
  }
};

const StyledButton = styled.button<ButtonProps>`
  border-radius: 10px;
  font-family: "Poppins", sans-serif;
  border: 5px solid ${props => intentToColor(props.intent, props.theme, 1)};
  font-size: 2rem;
  background-color: ${props => props.theme.light};
  color: ${props => intentToColor(props.intent, props.theme, 1)} 
  &:hover: {
    color: ${props => intentToColor(props.intent,props.theme,2)};
  }
`;

export const Button: React.FC<ButtonProps> = props => {
  return (
    <StyledButton {...props}>
      <div style={{ display: "flex" }}>{props.children}</div>
    </StyledButton>
  );
};

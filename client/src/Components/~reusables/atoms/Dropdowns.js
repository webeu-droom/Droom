import styled from "styled-components";
import { extra_small_space } from "../variables/spacing";
import { white, black } from "../variables/colors";
import { button_text } from "../variables/font-sizes";
import { source_sans_pro } from "../variables/font-family";

export const Dropdown = styled.select`
  font-size: ${button_text};
  padding: 6px ${extra_small_space};
  font-family: ${source_sans_pro};
  background-color: ${white};
  color: ${black};
  border-color: ${black};
  font-weight: 400;
  min-width: 160px;
  outline: none;
  border-radius: 4px;
  box-shadow: 0 0.8rem 2.5rem 0 rgba(40, 51, 63, 0.11);
  transition: all 100ms ease-in-out;
  cursor: pointer;

  &:active {
    opacity: 0.8;
    box-shadow: 0 6px 10px 0 rgba(40, 51, 63, 0.11);
  }
`;

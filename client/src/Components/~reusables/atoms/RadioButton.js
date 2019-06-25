import styled from "styled-components";
import {
  extra_small_space,
  small_space,
  medium_space_1
} from "../variables/spacing";
import { white, blue, black } from "../variables/colors";
import { button_text } from "../variables/font-sizes";
import { source_sans_pro } from "../variables/font-family";

export const RadioButton = styled.fieldset`
  font-size: ${button_text};
  font-family: ${source_sans_pro};
  box-shadow: 0 0.8rem 2.5rem 0 rgba(40, 51, 63, 0.05);
  transition: all 100ms ease-in-out;
  width: 100%;
  background-color: transparent;
  border: 1px solid #eaeaea;
  border-radius: 4px;
  padding-left: ${small_space};
  font-size: 16px;
  margin-bottom: ${medium_space_1};
  color: ${black};

  div {
    display: inline-block;
    margin-right: ${small_space};

    input,
    label {
      vertical-align: middle;
    }
  }

  &:active {
    opacity: 0.8;
    box-shadow: 0 6px 10px 0 rgba(40, 51, 63, 0.11);
  }
`;

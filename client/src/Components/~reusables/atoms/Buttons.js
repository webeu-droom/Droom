import styled from 'styled-components';
import { extra_small_space } from '../variables/spacing';
import { white, blue, black } from '../variables/colors';
import { button_text, body_1 } from '../variables/font-sizes'
import { source_sans_pro } from '../variables/font-family';

export const Button = styled.button`
  font-size: ${button_text};
  padding: 5px ${extra_small_space};
  font-family: ${source_sans_pro};
  font-weight: 600;
  min-width: 140px;
  border: none;
  outline: none;
  border-radius: 4px;
  box-shadow: 0 .8rem 2.5rem 0 rgba(40, 51, 63, .11);
  transition: all 100ms ease-in-out;
  cursor: pointer;
  
  &:active {
    opacity: .8;
    box-shadow: 0 6px 10px 0 rgba(40, 51, 63, .11);
  }
`;

export const ButtonPrimary = styled(Button)`
  background-color: ${blue};
  color: ${white};
`;

export const ButtonSecondary = styled(Button)`
  background-color: ${black};
  color: ${white};
`;

export const TextButton = styled(Button)`
  background-color: transparent;
  color: ${blue};
  padding: 0;
  min-width: auto;
  box-shadow: none;
`;

export const ButtonTertiary = styled(Button)`
  background-color: ${white};
  color: ${black};
  border: 1px solid ${black};
  font-size: ${body_1};
`;

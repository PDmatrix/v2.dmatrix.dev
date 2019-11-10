import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  body {
    background-color: ${(props): string => props.theme.colors.bg};
    color: ${(props): string => props.theme.colors.textNormal};
  }
`;

export default GlobalStyle;

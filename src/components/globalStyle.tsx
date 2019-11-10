import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  body {
    background-color: ${(props): string => props.theme.colors.bg};
    color: ${(props): string => props.theme.colors.textNormal};
  }
  
  a {
    color: ${(props): string => props.theme.colors.link};
  }
  
  p {
    color: ${(props): string => props.theme.colors.textNormal};
  }
  
  hr {
    background: ${(props): string => props.theme.colors.hr};
  }
`;

export default GlobalStyle;

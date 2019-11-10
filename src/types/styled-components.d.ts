import 'styled-components';

// and extend them!
declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      bg: string;
      link: string;
      textNormal: string;
      hr: string;
      codeBg: string;
    };
  }
}

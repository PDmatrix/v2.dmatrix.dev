declare module 'react-typography' {
  import { ReactElement } from 'react';
  interface MyComponentProps {
    typography: any;
  }

  export const TypographyStyle: (props: MyComponentProps) => ReactElement;
  export const GoogleFont: (props: MyComponentProps) => ReactElement;
}

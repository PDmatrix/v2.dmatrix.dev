import Typography from 'typography';
// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
import Funston from 'typography-theme-funston';
import theme from './theme';

Funston.overrideThemeStyles = () => {
  return {
    a: {
      color: theme.colors.link,
    },
    p: {
      color: theme.colors.textNormal,
    },
    hr: {
      background: theme.colors.hr,
    },
  };
};

//delete Wordpress2016.googleFonts

const typography = new Typography(Funston);

// Hot reload typography in development.
/*if (process.env.NODE_ENV !== `production`) {
  typography.injectStyles();
}*/

export default typography;
export const rhythm = typography.rhythm;
export const scale = typography.scale;

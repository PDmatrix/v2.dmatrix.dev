import Typography from 'typography';
// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
import Funston from 'typography-theme-funston';

Funston.overrideThemeStyles = () => {
  return {
    a: {
      color: `var(--link)`,
    },
    p: {
      color: `var(--text-normal)`,
    },
    hr: {
      background: `var(--hr)`,
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

import Typography from "typography"
import Funston from "typography-theme-funston";
import "./global.css"


Funston.overrideThemeStyles = () => {
  return {
    "a": {
      color: `var(--link)`
    },
    "a.gatsby-resp-image-link": {
      boxShadow: `none`,
    },
    "p": {
      color: `var(--textNormal)`
    },
    "hr": {
      background: `var(--hr)`
    }
  }
}

//delete Wordpress2016.googleFonts

const typography = new Typography(Funston)

// Hot reload typography in development.
if (process.env.NODE_ENV !== `production`) {
  typography.injectStyles()
}

export default typography
export const rhythm = typography.rhythm;
export const scale = typography.scale;

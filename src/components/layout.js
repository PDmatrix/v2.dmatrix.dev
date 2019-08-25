import React from "react";
import { Link } from "gatsby";

import { rhythm, scale } from "../utils/typography";

const styles = {
  marginLeft: `auto`,
  marginRight: `auto`,
  maxWidth: rhythm(24),
  padding: `${rhythm(1.5)} ${rhythm(3 / 4)}`,
  color: "var(--textNormal)",
  transition: "color 0.2s ease-out, background 0.2s ease-out",
  minHeight: "100vh"
};

const Layout = ({ title, children }) => {
  return (
    <div style={styles}>
      <header>
        <h1>
          <Link
            style={{
              boxShadow: `none`,
              textDecoration: `none`,
              color: `inherit`
            }}
            to={`/`}
          >
            {title}
          </Link>
        </h1>
      </header>
      <main>{children}</main>
      <footer>
        © {new Date().getFullYear()}
        {` `}
        <a href="https://github.com/PDmatrix">Github</a>
      </footer>
    </div>
  );
};

export default Layout;

import React from "react";
import profilePic from "../../content/assets/profile-pic.jpg";

import { rhythm } from "../utils/typography";

function Bio() {
  return (
    <div
      style={{
        display: `flex`,
        marginBottom: rhythm(2)
      }}
    >
      <img
        alt={"Dmitry Sebakov"}
        src={profilePic}
        style={{
          marginRight: rhythm(1 / 2),
          marginBottom: 0,
          width: rhythm(2),
          height: rhythm(2.15),
          borderRadius: "50%"
        }}
      />
      <p style={{ maxWidth: 290 }}>
        Written by{" "}
        <a href="https://github.com/PDmatrix">
          <strong>Dmitry Sebakov</strong>
        </a>
        <br />
        Sometimes I write stuff! <span className="emoji">😄</span>
      </p>
    </div>
  );
}

export default Bio;

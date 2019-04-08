import React from "react"
import profilePic from '../../content/assets/profile-pic.jpg';

import { rhythm } from "../utils/typography"

function Bio() {
  return (
    <div
      style={{
        display: `flex`,
        marginBottom: rhythm(2.5),
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
          borderRadius: "50%",
        }}
      />
      <p>
        Written by <strong>Dmitry Sebakov</strong>
      </p>
    </div>
  )
}

export default Bio

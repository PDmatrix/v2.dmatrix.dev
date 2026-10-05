import { readFile } from "node:fs/promises";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);

// Fontsource ships licensed font files locally: no network calls during builds.
const [regularData, boldData] = await Promise.all(
  [400, 700].map(weight =>
    readFile(
      require.resolve(
        `@fontsource/ibm-plex-mono/files/ibm-plex-mono-latin-${weight}-normal.woff`
      )
    )
  )
);

export { regularData, boldData };

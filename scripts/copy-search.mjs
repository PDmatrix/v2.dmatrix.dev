import { cp, rm } from "node:fs/promises";

// Make the last built index available to the dev server, without stale chunks.
await rm("public/pagefind", { recursive: true, force: true });
await cp("dist/pagefind", "public/pagefind", { recursive: true });

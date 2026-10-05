import { slug } from "github-slugger";

// Keep tag slugs compatible with published URLs.
export const slugifyStr = (value: string) => slug(value);
export const slugifyAll = (values: string[]) => values.map(slugifyStr);

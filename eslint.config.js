import js from "@eslint/js";
import { defineConfig, globalIgnores } from "eslint/config";
import astro from "eslint-plugin-astro";
import tseslint from "typescript-eslint";
import globals from "globals";

export default defineConfig([
  globalIgnores([
    "dist/**",
    ".astro/**",
    ".yarn/**",
    ".cache/**",
    "public/pagefind/**",
    "playwright-report/**",
    "test-results/**",
  ]),
  {
    files: ["**/*.{js,mjs,cjs,ts}"],
    extends: [js.configs.recommended],
    languageOptions: { globals: { ...globals.node, ...globals.browser } },
  },
  {
    files: ["**/*.ts"],
    extends: [tseslint.configs.recommended],
  },
  ...astro.configs.recommended,
  {
    files: ["**/*.astro"],
    languageOptions: {
      parserOptions: { parser: tseslint.parser },
      globals: globals.browser,
    },
  },
]);

import type { Linter } from "eslint";

import tsparser from "@typescript-eslint/parser";

const typeScriptLanguageOptions: Linter.LanguageOptions = {
  parser: tsparser,
  parserOptions: {
    ecmaVersion: "latest",
    projectService: true,
    sourceType: "module",
    tsconfigRootDir: process.cwd(),
  },
};

export default typeScriptLanguageOptions;

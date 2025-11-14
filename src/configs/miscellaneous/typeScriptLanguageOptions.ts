import type { Linter } from "eslint";

import tseslint from "typescript-eslint";

const typeScriptLanguageOptions: Linter.LanguageOptions = {
  parser: tseslint.parser,
  parserOptions: {
    ecmaVersion: "latest",
    projectService: true,
    sourceType: "module",
    tsconfigRootDir: process.cwd(),
  },
};

export default typeScriptLanguageOptions;

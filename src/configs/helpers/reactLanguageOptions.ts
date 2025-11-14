import type { Linter } from "eslint";

import globals from "globals";

const reactLanguageOptions: Linter.LanguageOptions = {
  ecmaVersion: 2020,
  globals: globals.browser,
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
  },
};

export default reactLanguageOptions;

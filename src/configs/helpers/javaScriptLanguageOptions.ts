import type { Linter } from "eslint";

import globals from "globals";

const javaScriptLanguageOptions: Linter.LanguageOptions = {
  globals: {
    ...globals.node,
    ...globals.browser,
    ...globals.vitest,
  },
};

export default javaScriptLanguageOptions;

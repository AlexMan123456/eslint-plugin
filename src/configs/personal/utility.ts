import type { Linter } from "eslint";

import tseslint from "typescript-eslint";

const utilityConfig: Linter.Config[] = [
  {
    plugins: {
      "@typescript-eslint": tseslint.plugin,
    },
    rules: {
      "@typescript-eslint/explicit-module-boundary-types": "error",
    },
  },
];

export default utilityConfig;

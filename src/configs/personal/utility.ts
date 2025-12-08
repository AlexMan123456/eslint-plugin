import type { Linter } from "eslint";

import tseslint from "typescript-eslint";

const personalUtility: Linter.Config[] = [
  {
    name: "@alextheman/personal/utility",
    plugins: {
      "@typescript-eslint": tseslint.plugin,
    },
    rules: {
      "@typescript-eslint/explicit-module-boundary-types": "error",
    },
  },
];

export default personalUtility;

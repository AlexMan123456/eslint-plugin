import type { Linter } from "eslint";

import jsdoc from "eslint-plugin-jsdoc";
import tseslint from "typescript-eslint";

import requireJsdocOptions from "src/configs/helpers/requireJsdocOptions";

const personalUtility: Linter.Config[] = [
  {
    name: "@alextheman/personal/utility",
    plugins: {
      "@typescript-eslint": tseslint.plugin,
      jsdoc,
    },
    rules: {
      "@typescript-eslint/explicit-module-boundary-types": "error",
      "jsdoc/require-jsdoc": ["error", requireJsdocOptions],
    },
  },
];

export default personalUtility;

import type { Linter } from "eslint";

import jsdoc from "eslint-plugin-jsdoc";

import requireJsdocOptions from "src/configs/helpers/requireJsdocOptions";

const personalTypeScriptPackage: Linter.Config[] = [
  jsdoc.configs["flat/recommended-typescript-error"],
  {
    rules: {
      "jsdoc/require-jsdoc": ["warn", requireJsdocOptions],
    },
  },
];

export default personalTypeScriptPackage;

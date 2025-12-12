import type { Linter } from "eslint";

import jsdoc from "eslint-plugin-jsdoc";

const personalTypeScriptPackage: Linter.Config[] = [
  jsdoc.configs["flat/recommended-typescript"],
  {
    rules: {
      "jsdoc/require-jsdoc": [
        "warn",
        { enableFixer: false, require: { ClassDeclaration: true, MethodDefinition: true } },
      ],
    },
  },
];

export default personalTypeScriptPackage;

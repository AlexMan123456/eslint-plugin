import type { Linter } from "eslint";

import js from "@eslint/js";
import prettierConfig from "eslint-config-prettier";
import importPlugin from "eslint-plugin-import";

import javaScriptLanguageOptions from "src/configs/miscellaneous/javaScriptLanguageOptions";
import unusedVarsIgnorePatterns from "src/configs/miscellaneous/unusedVarsIgnorePatterns";

const javaScriptBase: Linter.Config[] = [
  js.configs.recommended,
  prettierConfig,
  {
    files: ["**/*.js", "**/*.jsx", "**/*.ts", "**/*.tsx"],
    ignores: ["dist"],
    languageOptions: javaScriptLanguageOptions,
    name: "@alextheman/general/javascript",
    plugins: {
      import: importPlugin,
    },
    rules: {
      eqeqeq: "error",
      "import/no-unresolved": "error",
      "no-cond-assign": "error",
      "no-console": ["error", { allow: ["warn", "error", "info"] }],
      "no-eval": "error",
      "no-lonely-if": "error",
      "no-new-wrappers": "error",
      "no-param-reassign": "error",
      "no-restricted-imports": [
        "error",
        {
          patterns: [
            {
              group: ["node_modules"],
              message: "What on Earth are you doing? Leave poor node_modules alone!",
            },
          ],
        },
      ],
      "no-undef": "error",
      "no-unused-vars": ["error", unusedVarsIgnorePatterns],
      "no-useless-rename": "error",
      "no-useless-return": "error",
      "prefer-const": "error",
    },
    settings: {
      "import/resolver": {
        node: true,
      },
    },
  },
];

export default javaScriptBase;

import type { Linter } from "eslint";

import js from "@eslint/js";
import prettierConfig from "eslint-config-prettier";
import importPlugin from "eslint-plugin-import";
import globals from "globals";

const javaScriptBase: Linter.Config[] = [
  js.configs.recommended,
  prettierConfig,
  {
    files: ["**/*.js", "**/*.jsx", "**/*.ts", "**/*.tsx"],
    ignores: ["dist"],
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.browser,
      },
    },
    name: "@alextheman/eslint-config-javascript-base",
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
      "no-unused-vars": [
        "error",
        {
          argsIgnorePattern: "^_",
          caughtErrorsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
        },
      ],
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

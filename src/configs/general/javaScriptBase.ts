import type { Linter } from "eslint";

import js from "@eslint/js";
import prettierConfig from "eslint-config-prettier";
import importPlugin from "eslint-plugin-import";
import packageJson from "eslint-plugin-package-json";
import perfectionist from "eslint-plugin-perfectionist";
import prettierPlugin from "eslint-plugin-prettier";
import globals from "globals";

const javaScriptBase: Linter.Config[] = [
  js.configs.recommended,
  prettierConfig,
  packageJson.configs.recommended,
  {
    files: ["**/*.js", "**/*.jsx", "**/*.ts", "**/*.tsx", "!package.json"],
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
      perfectionist,
      prettier: prettierPlugin,
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
      "perfectionist/sort-exports": [
        "error",
        {
          customGroups: [],
          fallbackSort: { type: "natural" },
          groups: ["value-export", "type-export"],
          ignoreCase: true,
          newlinesBetween: 1,
          order: "asc",
          partitionByComment: false,
          partitionByNewLine: false,
          specialCharacters: "keep",
          type: "alphabetical",
        },
      ],
      "perfectionist/sort-imports": [
        "error",
        {
          groups: ["type", "builtin", "external", "internal", "object"],
          ignoreCase: true,
          internalPattern: ["^src/.*"],
          newlinesBetween: 1,
          order: "asc",
          partitionByComment: false,
          partitionByNewLine: false,
          specialCharacters: "keep",
          type: "alphabetical",
        },
      ],
      "prefer-const": "error",
      "sort-vars": "error",
    },
    settings: {
      "import/resolver": {
        node: true,
      },
    },
  },
];

export default javaScriptBase;

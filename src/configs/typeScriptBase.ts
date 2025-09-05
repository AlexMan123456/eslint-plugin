import type { Linter } from "eslint";

import js from "@eslint/js";
import eslintPlugin from "@typescript-eslint/eslint-plugin";
import tsparser from "@typescript-eslint/parser";
import prettierConfig from "eslint-config-prettier";
import importPlugin from "eslint-plugin-import";
import packageJson from "eslint-plugin-package-json";
import perfectionist from "eslint-plugin-perfectionist";
import prettierPlugin from "eslint-plugin-prettier";
import globals from "globals";

import prettierRules from "src/configs/prettierRules";

const typeScriptBase = [
  js.configs.recommended,
  prettierConfig,
  packageJson.configs.recommended,
  {
    name: "@alextheman/eslint-config-typescript-base",
    files: ["**/*.ts", "**/*.tsx"],
    languageOptions: {
      parser: tsparser,
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
      },
      globals: {
        ...globals.node,
        ...globals.browser,
      },
    },
    settings: {
      "import/resolver": {
        typescript: true,
        node: true,
      },
    },
    ignores: ["dist"],
    plugins: {
      "@typescript-eslint": eslintPlugin,
      import: importPlugin,
      prettier: prettierPlugin,
      perfectionist,
    },
    rules: {
      "import/no-unresolved": "error",
      eqeqeq: "error",
      "no-console": ["error", { allow: ["warn", "error"] }],
      "perfectionist/sort-imports": [
        "error",
        {
          type: "alphabetical",
          order: "asc",
          ignoreCase: true,
          partitionByComment: false,
          partitionByNewLine: false,
          specialCharacters: "keep",
          groups: ["type", "builtin", "external", "internal", "object"],
          newlinesBetween: 1,
          internalPattern: ["^src/.*"],
        },
      ],
      "perfectionist/sort-exports": [
        "error",
        {
          type: "alphabetical",
          order: "asc",
          fallbackSort: { type: "natural" },
          ignoreCase: true,
          specialCharacters: "keep",
          partitionByComment: false,
          partitionByNewLine: false,
          newlinesBetween: 1,
          groups: ["value-export", "type-export"],
          customGroups: [],
        },
      ],
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
          caughtErrorsIgnorePattern: "^_",
        },
      ],
      // Disable regular no-unused-vars rule since that will flag interface declarations. Only use the TypeScript specific rule for this.
      "no-unused-vars": "off",
      "func-style": ["error", "declaration", { allowArrowFunctions: false }],
      "prefer-arrow-callback": ["error", { allowNamedFunctions: false }],
      "arrow-body-style": ["error", "always"],
      "no-param-reassign": "error",
      "no-useless-rename": "error",
      "sort-vars": "error",
      "no-cond-assign": "error",
      "no-undef": "error",
      "@typescript-eslint/consistent-type-imports": "error",
      "prettier/prettier": ["warn", prettierRules],
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
    },
  },
  {
    files: ["**/*.test.ts"],
    rules: {
      "no-restricted-imports": [
        "error",
        {
          paths: [
            {
              name: "node:test",
              message: "Use test functions from vitest instead.",
            },
          ],
        },
      ],
    },
  },
] as Linter.Config[];

export default typeScriptBase;

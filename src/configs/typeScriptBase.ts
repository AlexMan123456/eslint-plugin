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

const typeScriptBase: Linter.Config[] = [
  js.configs.recommended,
  prettierConfig,
  packageJson.configs.recommended,
  {
    files: ["**/*.ts", "**/*.tsx"],
    ignores: ["dist"],
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.browser,
      },
      parser: tsparser,
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
      },
    },
    name: "@alextheman/eslint-config-typescript-base",
    plugins: {
      "@typescript-eslint": eslintPlugin,
      import: importPlugin,
      perfectionist,
      prettier: prettierPlugin,
    },
    rules: {
      "@typescript-eslint/consistent-type-imports": "error",
      "@typescript-eslint/no-redeclare": ["error", { ignoreDeclarationMerge: true }],
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          argsIgnorePattern: "^_",
          caughtErrorsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
        },
      ],
      "arrow-body-style": ["error", "always"],
      curly: ["error", "all"],
      "dot-notation": "error",
      eqeqeq: "error",
      "func-style": ["error", "declaration", { allowArrowFunctions: false }],
      "import/no-unresolved": "error",
      "no-cond-assign": "error",
      "no-console": ["error", { allow: ["warn", "error"] }],
      "no-else-return": "error",
      "no-eval": "error",
      "no-implicit-coercion": ["error", { allow: ["!!"] }],
      "no-lonely-if": "error",
      "no-new-wrappers": "error",
      "no-param-reassign": "error",
      // Disable regular no-redeclare in favour of TypeScript-specific version since that will flag type redeclarations when we do const MyType = {}; export type MyType = ...
      "no-redeclare": "off",
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
      // Disable regular no-unused-vars rule since that will flag interface declarations. Only use the TypeScript specific rule for this.
      "no-unused-vars": "off",
      "no-useless-rename": "error",
      "no-useless-return": "error",
      "operator-assignment": ["error", "always"],
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
      "prefer-arrow-callback": ["error", { allowNamedFunctions: false }],
      "prefer-const": "error",
      "prefer-destructuring": "error",
      "prefer-template": "error",
      "prettier/prettier": ["warn", prettierRules],
      "sort-vars": "error",
    },
    settings: {
      "import/resolver": {
        node: true,
        typescript: true,
      },
    },
  },
  {
    files: ["**/*.test.ts"],
    rules: {
      "no-restricted-globals": [
        "error",
        {
          message:
            "Do not use global describe function. Import test functions from vitest instead.",
          name: "describe",
        },
        {
          message: "Do not use global test function. Import test functions from vitest instead.",
          name: "test",
        },
        {
          message: "Do not use global expect function. Import test functions from vitest instead.",
          name: "expect",
        },
      ],
      "no-restricted-imports": [
        "error",
        {
          paths: [
            {
              message: "Use test functions from vitest instead.",
              name: "node:test",
            },
          ],
        },
      ],
    },
  },
] as Linter.Config[];

export default typeScriptBase;

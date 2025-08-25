import type { Linter } from "eslint";

import js from "@eslint/js";
import eslintPlugin from "@typescript-eslint/eslint-plugin";
import tsparser from "@typescript-eslint/parser";
import prettierConfig from "eslint-config-prettier";
import importPlugin from "eslint-plugin-import";
import perfectionist from "eslint-plugin-perfectionist";
import prettierPlugin from "eslint-plugin-prettier";
import globals from "globals";

import prettierRules from "src/configs/prettierRules";
import warnOnFixButErrorOnLint from "src/configs/warnOnFixButErrorOnLint";

const esLintConfigTypeScriptBase = [
  js.configs.recommended,
  prettierConfig,
  {
    name: "@alextheman/eslint-config-typescript-base",
    files: ["**/*.ts", "**/*.tsx", "**/*.js", "**/*.jsx"],
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
      "import/no-unresolved": warnOnFixButErrorOnLint,
      eqeqeq: warnOnFixButErrorOnLint,
      "no-console": [warnOnFixButErrorOnLint, { allow: ["warn", "error"] }],
      "no-restricted-imports": [
        warnOnFixButErrorOnLint,
        {
          patterns: [
            {
              group: ["node:test"],
              message: "Use test functions from vitest instead.",
            },
          ],
        },
      ],
      "perfectionist/sort-imports": [
        warnOnFixButErrorOnLint,
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
        warnOnFixButErrorOnLint,
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
        warnOnFixButErrorOnLint,
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
          caughtErrorsIgnorePattern: "^_",
        },
      ],
      // Disable regular no-unused-vars rule since that will flag interface declarations. Only use the TypeScript specific rule for this.
      "no-unused-vars": "off",
      "func-style": [warnOnFixButErrorOnLint, "declaration", { allowArrowFunctions: false }],
      "prefer-arrow-callback": [warnOnFixButErrorOnLint, { allowNamedFunctions: false }],
      "arrow-body-style": [warnOnFixButErrorOnLint, "always"],
      "no-param-reassign": warnOnFixButErrorOnLint,
      "no-useless-rename": warnOnFixButErrorOnLint,
      "sort-vars": warnOnFixButErrorOnLint,
      "no-cond-assign": warnOnFixButErrorOnLint,
      "no-undef": warnOnFixButErrorOnLint,
      "@typescript-eslint/consistent-type-imports": warnOnFixButErrorOnLint,
      "prettier/prettier": ["warn", prettierRules],
    },
  },
] as Linter.Config[];

export default esLintConfigTypeScriptBase;

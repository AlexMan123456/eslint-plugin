import type { Linter } from "eslint";

import tsparser from "@typescript-eslint/parser";
import tseslint from "typescript-eslint";

import javaScriptBase from "src/configs/general/javaScriptBase";

const typeScriptBase: Linter.Config[] = [
  ...tseslint.configs.recommended,
  ...javaScriptBase,
  {
    files: ["**/*.ts", "**/*.tsx"],
    languageOptions: {
      parser: tsparser,
      parserOptions: {
        ecmaVersion: "latest",
        projectService: true,
        sourceType: "module",
        tsconfigRootDir: process.cwd(),
      },
    },
    name: "@alextheman/eslint-config-typescript-base",
    rules: {
      "@typescript-eslint/consistent-type-exports": "error",
      "@typescript-eslint/consistent-type-imports": "error",
      "@typescript-eslint/explicit-member-accessibility": "error",
      "@typescript-eslint/no-deprecated": "warn",
      "@typescript-eslint/no-redeclare": ["error", { ignoreDeclarationMerge: true }],
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          argsIgnorePattern: "^_",
          caughtErrorsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
        },
      ],
      // Disable regular no-redeclare in favour of TypeScript-specific version since that will flag type redeclarations when we do const MyType = {}; export type MyType = ...
      "no-redeclare": "off",
      // Disable no-undef because undefined variables tend to be better caught by the TypeScript compiler.
      "no-undef": "off",
      // Disable regular no-unused-vars rule since that will flag interface declarations. Only use the TypeScript specific rule for this.
      "no-unused-vars": "off",
    },
    settings: {
      "import/resolver": {
        node: true,
        typescript: true,
      },
    },
  },
];

export default typeScriptBase;

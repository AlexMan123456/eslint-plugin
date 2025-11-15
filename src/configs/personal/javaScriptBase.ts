import type { Linter } from "eslint";
import type { AlexPlugin } from "src/index";

import perfectionist from "eslint-plugin-perfectionist";
import prettierPlugin from "eslint-plugin-prettier";

import javaScriptLanguageOptions from "src/configs/helpers/javaScriptLanguageOptions";
import prettierRules from "src/configs/helpers/prettierRules";

function createPersonalJavaScriptBaseConfig(plugin: AlexPlugin): Linter.Config[] {
  return [
    {
      files: ["**/*.js", "**/*.jsx", "**/*.ts", "**/*.tsx"],
      languageOptions: javaScriptLanguageOptions,
      name: "@alextheman/personal/javascript",
      plugins: {
        "@alextheman": plugin,
        perfectionist,
        prettier: prettierPlugin,
      },
      rules: {
        "@alextheman/no-relative-imports": "error",
        "arrow-body-style": ["error", "always"],
        curly: ["error", "all"],
        "func-style": ["error", "declaration", { allowArrowFunctions: false }],
        "no-else-return": "error",
        "no-implicit-coercion": ["error", { allow: ["!!"] }],
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
        "prefer-destructuring": "error",
        "prefer-template": "error",
        "prettier/prettier": ["warn", prettierRules],
        "sort-vars": "error",
      },
    },
    {
      files: ["src/**/index.{js,jsx,ts,tsx}"],
      rules: {
        // Since index files generally tend to export files from the same folder, they tend to be more coupled with their location in the folder,
        // so it feels more natural to allow only root-level relative imports from an index file.
        "@alextheman/no-relative-imports": ["error", { depth: 0 }],
      },
    },
  ];
}

export default createPersonalJavaScriptBaseConfig;

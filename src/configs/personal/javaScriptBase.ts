import type { Linter } from "eslint";
import type { AlexPlugin } from "src/index";

import perfectionist from "eslint-plugin-perfectionist";
import prettierPlugin from "eslint-plugin-prettier";

import javaScriptLanguageOptions from "src/configs/miscellaneous/javaScriptLanguageOptions";
import prettierRules from "src/configs/miscellaneous/prettierRules";

function createPersonalJavaScriptBaseConfig(plugin: AlexPlugin): Linter.Config[] {
  return [
    {
      files: ["**/*.js", "**/*.jsx", "**/*.ts", "**/*.tsx"],
      languageOptions: javaScriptLanguageOptions,
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
  ];
}

export default createPersonalJavaScriptBaseConfig;

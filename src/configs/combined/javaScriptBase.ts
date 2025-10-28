import type { Linter } from "eslint";

import createCombinedTestsBaseConfig from "src/configs/combined/testsBase";
import javaScriptBase from "src/configs/general/javaScriptBase";
import { createPluginBaseConfig } from "src/configs/plugin";
import { prettierRules, type AlexPlugin } from "src/index";

function createCombinedJavaScriptBaseConfig(plugin: AlexPlugin): Linter.Config[] {
  return [
    ...createPluginBaseConfig(plugin),
    ...javaScriptBase,
    {
      rules: {
        "@alextheman/no-relative-imports": "error",
        "arrow-body-style": ["error", "always"],
        curly: ["error", "all"],
        "func-style": ["error", "declaration", { allowArrowFunctions: false }],
        "no-else-return": "error",
        "no-implicit-coercion": ["error", { allow: ["!!"] }],
        "operator-assignment": ["error", "always"],
        "prefer-arrow-callback": ["error", { allowNamedFunctions: false }],
        "prefer-destructuring": "error",
        "prefer-template": "error",
        "prettier/prettier": ["warn", prettierRules],
      },
    },
    ...createCombinedTestsBaseConfig(plugin),
  ];
}

export default createCombinedJavaScriptBaseConfig;

import type { Linter } from "eslint";
import type { AlexPlugin } from "src/index";

import createCombinedJavaScriptBaseConfig from "src/configs/combined/javaScriptBase";
import { typeScriptBase } from "src/configs/general";
import { createPluginBaseConfig } from "src/configs/plugin";

function createCombinedTypeScriptBaseConfig(plugin: AlexPlugin): Linter.Config[] {
  return [
    ...createPluginBaseConfig(plugin),
    ...createCombinedJavaScriptBaseConfig(plugin),
    ...typeScriptBase,
    {
      files: ["**/*.ts", "**/*.tsx", "!package.json"],
      rules: {
        "@alextheman/standardise-error-messages": "error",
        "@typescript-eslint/array-type": ["error", { default: "array" }],
        "@typescript-eslint/consistent-type-assertions": ["error", { assertionStyle: "as" }],
        "@typescript-eslint/consistent-type-definitions": "error",
        "@typescript-eslint/dot-notation": "error",
        "@typescript-eslint/method-signature-style": ["error", "property"],
      },
    },
  ];
}

export default createCombinedTypeScriptBaseConfig;

import type { Linter } from "eslint";
import type { AlexPlugin } from "src/index";

import esLintConfigTypeScriptBase from "src/configs/esLintConfigTypeScriptBase";
import warnOnFixButErrorOnLint from "src/configs/warnOnFixButErrorOnLint";

function createAlexTypeScriptBaseConfig(plugin: AlexPlugin): Linter.Config[] {
  return [
    ...esLintConfigTypeScriptBase,
    {
      plugins: {
        "@alextheman": plugin,
      },
      rules: {
        "@alextheman/no-namespace-imports": warnOnFixButErrorOnLint,
        "@alextheman/no-relative-imports": warnOnFixButErrorOnLint,
      },
    },
  ];
}

export default createAlexTypeScriptBaseConfig;

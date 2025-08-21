import type { Linter } from "eslint";
import type { AlexPlugin } from "src/index";

import esLintConfigTypeScriptBase, {
  warnOnFixButErrorOnLint,
} from "src/configs/eslint-config-typescript-base";

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

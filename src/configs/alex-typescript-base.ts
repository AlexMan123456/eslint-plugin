import type { Linter } from "eslint";

import esLintConfigTypeScriptBase, {
  warnOnFixButErrorOnLint,
} from "src/configs/eslint-config-typescript-base";
import type { AlexPlugin } from "src/index";

function createAlexTypeScriptBaseConfig(plugin: AlexPlugin) {
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
  ] satisfies Linter.Config[];
}

export default createAlexTypeScriptBaseConfig;

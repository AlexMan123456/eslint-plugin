import type { Linter } from "eslint";
import type { AlexPlugin } from "src/index";

import warnOnFixButErrorOnLint from "src/configs/warnOnFixButErrorOnLint";

function createAlexPluginBaseConfig(plugin: AlexPlugin): Linter.Config[] {
  return [
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

export default createAlexPluginBaseConfig;

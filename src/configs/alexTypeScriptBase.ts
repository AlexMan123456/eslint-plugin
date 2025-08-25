import type { Linter } from "eslint";
import type { AlexPlugin } from "src/index";

import createAlexPluginBaseConfig from "src/configs/alexPluginBase";
import typeScriptBase from "src/configs/typeScriptBase";

function createAlexTypeScriptBaseConfig(plugin: AlexPlugin): Linter.Config[] {
  return [...createAlexPluginBaseConfig(plugin), ...typeScriptBase];
}

export default createAlexTypeScriptBaseConfig;

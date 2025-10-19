import type { Linter } from "eslint";
import type { AlexPlugin } from "src/index";

import typeScriptBase from "src/configs/general/typeScriptBase";
import createAlexPluginBaseConfig from "src/configs/plugin/alexPluginBase";

function createAlexTypeScriptBaseConfig(plugin: AlexPlugin): Linter.Config[] {
  return [...createAlexPluginBaseConfig(plugin), ...typeScriptBase];
}

export default createAlexTypeScriptBaseConfig;

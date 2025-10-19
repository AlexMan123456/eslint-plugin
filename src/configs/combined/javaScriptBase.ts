import type { Linter } from "eslint";
import type { AlexPlugin } from "src/index";

import javaScriptBase from "src/configs/general/javaScriptBase";
import createPluginBaseConfig from "src/configs/plugin/pluginBase";

function createCombinedJavaScriptBaseConfig(plugin: AlexPlugin): Linter.Config[] {
  return [...createPluginBaseConfig(plugin), ...javaScriptBase];
}

export default createCombinedJavaScriptBaseConfig;

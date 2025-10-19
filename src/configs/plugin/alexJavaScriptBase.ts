import type { Linter } from "eslint";
import type { AlexPlugin } from "src/index";

import javaScriptBase from "src/configs/general/javaScriptBase";
import createAlexPluginBaseConfig from "src/configs/plugin/alexPluginBase";

function createAlexJavaScriptBaseConfig(plugin: AlexPlugin): Linter.Config[] {
  return [...createAlexPluginBaseConfig(plugin), ...javaScriptBase];
}

export default createAlexJavaScriptBaseConfig;

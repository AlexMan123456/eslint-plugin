import type { Linter } from "eslint";
import type { AlexPlugin } from "src/index";

import createAlexPluginBaseConfig from "src/configs/alexPluginBase";
import javaScriptBase from "src/configs/javaScriptBase";

function createAlexJavaScriptBaseConfig(plugin: AlexPlugin): Linter.Config[] {
  return [...createAlexPluginBaseConfig(plugin), ...javaScriptBase];
}

export default createAlexJavaScriptBaseConfig;

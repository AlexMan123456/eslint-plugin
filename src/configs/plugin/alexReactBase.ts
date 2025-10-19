import type { Linter } from "eslint";
import type { AlexPlugin } from "src/index";

import reactBase from "src/configs/general/reactBase";
import createAlexPluginBaseConfig from "src/configs/plugin/alexPluginBase";

function createAlexReactBaseConfig(plugin: AlexPlugin): Linter.Config[] {
  return [...createAlexPluginBaseConfig(plugin), ...reactBase];
}

export default createAlexReactBaseConfig;

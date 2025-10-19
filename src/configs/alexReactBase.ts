import type { Linter } from "eslint";
import type { AlexPlugin } from "src/index";

import createAlexPluginBaseConfig from "src/configs/alexPluginBase";
import reactBase from "src/configs/reactBase";

function createAlexReactBaseConfig(plugin: AlexPlugin): Linter.Config[] {
  return [...createAlexPluginBaseConfig(plugin), ...reactBase];
}

export default createAlexReactBaseConfig;

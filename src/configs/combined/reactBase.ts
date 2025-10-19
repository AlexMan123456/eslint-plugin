import type { Linter } from "eslint";
import type { AlexPlugin } from "src/index";

import reactBase from "src/configs/general/reactBase";
import createPluginBaseConfig from "src/configs/plugin/pluginBase";

function createCombinedReactBaseConfig(plugin: AlexPlugin): Linter.Config[] {
  return [...createPluginBaseConfig(plugin), ...reactBase];
}

export default createCombinedReactBaseConfig;

import type { Linter } from "eslint";
import type { AlexPlugin } from "src/index";

import { javaScriptBase, reactBase } from "src/configs/general";
import { createPluginBaseConfig } from "src/configs/plugin";

function createCombinedJavaScriptReactBaseConfig(plugin: AlexPlugin): Linter.Config[] {
  return [...createPluginBaseConfig(plugin), ...javaScriptBase, ...reactBase];
}

export default createCombinedJavaScriptReactBaseConfig;

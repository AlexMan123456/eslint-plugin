import type { Linter } from "eslint";
import type { AlexPlugin } from "src/index";

import createCombinedJavaScriptBaseConfig from "src/configs/combined/javaScriptBase";
import createCombinedReactBaseConfig from "src/configs/combined/reactBase";

function createCombinedJavaScriptReactBaseConfig(plugin: AlexPlugin): Linter.Config[] {
  return [...createCombinedJavaScriptBaseConfig(plugin), ...createCombinedReactBaseConfig(plugin)];
}

export default createCombinedJavaScriptReactBaseConfig;

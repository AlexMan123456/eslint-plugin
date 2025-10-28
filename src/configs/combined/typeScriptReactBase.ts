import type { Linter } from "eslint";
import type { AlexPlugin } from "src/index";

import createCombinedReactBaseConfig from "src/configs/combined/reactBase";
import createCombinedTypeScriptBaseConfig from "src/configs/combined/typeScriptBase";

function createCombinedTypeScriptReactBaseConfig(plugin: AlexPlugin): Linter.Config[] {
  return [...createCombinedTypeScriptBaseConfig(plugin), ...createCombinedReactBaseConfig(plugin)];
}

export default createCombinedTypeScriptReactBaseConfig;

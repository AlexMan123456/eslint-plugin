import type { Linter } from "eslint";
import type { AlexPlugin } from "src/index";

import reactBase from "src/configs/general/reactBase";
import createAlexTypeScriptBaseConfig from "src/configs/plugin/alexTypeScriptBase";

/**
 * @deprecated Please use [...plugin.configs.alexTypeScriptBase, ...plugin.configs.reactBase] instead.
 */
function createAlexTypeScriptReactBaseConfig(plugin: AlexPlugin): Linter.Config[] {
  return [...createAlexTypeScriptBaseConfig(plugin), ...reactBase];
}

export default createAlexTypeScriptReactBaseConfig;

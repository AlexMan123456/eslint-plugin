import type { Linter } from "eslint";
import type { AlexPlugin } from "src/index";

import { reactBase, typeScriptBase } from "src/configs/general";
import { createPluginBaseConfig } from "src/configs/plugin";

function createCombinedTypeScriptReactBaseConfig(plugin: AlexPlugin): Linter.Config[] {
  return [...createPluginBaseConfig(plugin), ...typeScriptBase, ...reactBase];
}

export default createCombinedTypeScriptReactBaseConfig;

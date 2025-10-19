import type { Linter } from "eslint";
import type { AlexPlugin } from "src/index";

import { typeScriptBase } from "src/configs/general";
import { createPluginBaseConfig } from "src/configs/plugin";

function createCombinedTypeScriptBaseConfig(plugin: AlexPlugin): Linter.Config[] {
  return [...createPluginBaseConfig(plugin), ...typeScriptBase];
}

export default createCombinedTypeScriptBaseConfig;

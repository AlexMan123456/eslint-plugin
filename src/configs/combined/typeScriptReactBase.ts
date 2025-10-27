import type { Linter } from "eslint";
import type { AlexPlugin } from "src/index";

import createCombinedTypeScriptBaseConfig from "src/configs/combined/typeScriptBase";
import { reactBase } from "src/configs/general";

function createCombinedTypeScriptReactBaseConfig(plugin: AlexPlugin): Linter.Config[] {
  return [...createCombinedTypeScriptBaseConfig(plugin), ...reactBase];
}

export default createCombinedTypeScriptReactBaseConfig;

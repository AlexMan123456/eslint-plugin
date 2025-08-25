import type { Linter } from "eslint";
import type { AlexPlugin } from "src/index";

import createAlexTypeScriptBaseConfig from "src/configs/alexTypeScriptBase";
import typeScriptReactBase from "src/configs/typeScriptReactBase";

function createAlexTypeScriptReactBaseConfig(plugin: AlexPlugin): Linter.Config[] {
  return [...createAlexTypeScriptBaseConfig(plugin), ...typeScriptReactBase];
}

export default createAlexTypeScriptReactBaseConfig;

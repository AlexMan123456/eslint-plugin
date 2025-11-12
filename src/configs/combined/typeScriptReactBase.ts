import type { Linter } from "eslint";
import type { AlexPlugin } from "src/index";

import combinedReactBaseConfig from "src/configs/combined/reactBase";
import createCombinedTypeScriptBaseConfig from "src/configs/combined/typeScriptBase";

function createCombinedTypeScriptReactBaseConfig(plugin: AlexPlugin): Linter.Config[] {
  return [
    { name: "@alextheman/combined/typescript-react" },
    ...createCombinedTypeScriptBaseConfig(plugin),
    ...combinedReactBaseConfig,
  ];
}

export default createCombinedTypeScriptReactBaseConfig;

import type { Linter } from "eslint";
import type { AlexPlugin } from "src/index";

import createCombinedJavaScriptBaseConfig from "src/configs/combined/javaScriptBase";
import combinedReactBaseConfig from "src/configs/combined/reactBase";

function createCombinedJavaScriptReactBaseConfig(plugin: Readonly<AlexPlugin>): Linter.Config[] {
  return [
    { name: "@alextheman/combined/javascript-react" },
    ...createCombinedJavaScriptBaseConfig(plugin),
    ...combinedReactBaseConfig,
  ];
}

export default createCombinedJavaScriptReactBaseConfig;

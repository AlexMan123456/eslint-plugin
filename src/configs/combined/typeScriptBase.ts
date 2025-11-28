import type { Linter } from "eslint";
import type { AlexPlugin } from "src/index";

import createCombinedJavaScriptBaseConfig from "src/configs/combined/javaScriptBase";
import { typeScriptBase } from "src/configs/general";
import { createPersonalTypeScriptBaseConfig } from "src/configs/personal";

function createCombinedTypeScriptBaseConfig(plugin: Readonly<AlexPlugin>): Linter.Config[] {
  return [
    { name: "@alextheman/combined/typescript" },
    ...createCombinedJavaScriptBaseConfig(plugin),
    ...typeScriptBase,
    ...createPersonalTypeScriptBaseConfig(plugin),
  ];
}

export default createCombinedTypeScriptBaseConfig;

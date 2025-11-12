import type { Linter } from "eslint";
import type { AlexPlugin } from "src/index";

import createCombinedTestsBaseConfig from "src/configs/combined/testsBase";
import javaScriptBase from "src/configs/general/javaScriptBase";
import createPersonalJavaScriptBaseConfig from "src/configs/personal/javaScriptBase";
import { createPluginBaseConfig } from "src/configs/plugin";

function createCombinedJavaScriptBaseConfig(plugin: AlexPlugin): Linter.Config[] {
  return [
    {
      name: "@alextheman/combined/javascript",
    },
    ...createPluginBaseConfig(plugin),
    ...javaScriptBase,
    ...createPersonalJavaScriptBaseConfig(plugin),
    ...createCombinedTestsBaseConfig(plugin),
  ];
}

export default createCombinedJavaScriptBaseConfig;

import type { Linter } from "eslint";
import type { AlexPlugin } from "src/index";

import testsBase from "src/configs/general/testsBase";
import { createPluginBaseConfig } from "src/configs/plugin";

function createCombinedTestsBaseConfig(plugin: AlexPlugin): Linter.Config[] {
  return [...createPluginBaseConfig(plugin), ...testsBase];
}

export default createCombinedTestsBaseConfig;

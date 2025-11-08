import type { Linter } from "eslint";
import type { AlexPlugin } from "src/index";

import personalTestsBaseConfig from "src/configs/personal/testsBase";
import { createPluginTestsBaseConfig } from "src/configs/plugin";

function createCombinedTestsBaseConfig(plugin: AlexPlugin): Linter.Config[] {
  return [...createPluginTestsBaseConfig(plugin), ...personalTestsBaseConfig];
}

export default createCombinedTestsBaseConfig;

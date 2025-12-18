import type { Linter } from "eslint";

import type { AlexPlugin } from "src/index";

import personalTests from "src/configs/personal/tests";
import { pluginTests } from "src/configs/plugin";

function combinedTests(plugin: Readonly<AlexPlugin>): Linter.Config[] {
  return [{ name: "@alextheman/combined/tests" }, ...pluginTests(plugin), ...personalTests];
}

export default combinedTests;

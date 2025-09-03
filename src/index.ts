import type { Linter } from "eslint";

import { name, version } from "package.json";

import {
  createAlexPluginBaseConfig,
  createAlexTypeScriptBaseConfig,
  createAlexTypeScriptReactBaseConfig,
  typeScriptBase,
  typeScriptReactBase,
} from "src/configs";
import rules from "src/rules";

if (process.env.ESLINT_MODE) {
  console.warn(
    "ESLINT_MODE is now deprecated. Please use eslint --fix --suppress-all when running the fixer instead.",
  );
}

export interface AlexPlugin {
  meta: {
    name: typeof name;
    version: typeof version;
    namespace: "alextheman";
  };
  configs: {
    alexPluginBase: Linter.Config[];
    alexTypeScriptBase: Linter.Config[];
    alexTypeScriptReactBase: Linter.Config[];
    typeScriptBase: Linter.Config[];
    typeScriptReactBase: Linter.Config[];
  };
  rules: Record<string, any>;
}

export { prettierRules } from "src/configs";

export type { ValidTestFunctions } from "src/rules/consistent-test-function";

const plugin: AlexPlugin = {
  meta: {
    name,
    version,
    namespace: "alextheman",
  },
  configs: {
    alexPluginBase: [] as Linter.Config[],
    alexTypeScriptBase: [] as Linter.Config[],
    alexTypeScriptReactBase: [] as Linter.Config[],
    typeScriptBase: [] as Linter.Config[],
    typeScriptReactBase: [] as Linter.Config[],
  },
  rules,
};

plugin.configs = {
  alexPluginBase: createAlexPluginBaseConfig(plugin),
  alexTypeScriptBase: createAlexTypeScriptBaseConfig(plugin),
  alexTypeScriptReactBase: createAlexTypeScriptReactBaseConfig(plugin),
  typeScriptBase,
  typeScriptReactBase,
};

export default plugin;

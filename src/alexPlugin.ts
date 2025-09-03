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

const alexPlugin: AlexPlugin = {
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

alexPlugin.configs = {
  alexPluginBase: createAlexPluginBaseConfig(alexPlugin),
  alexTypeScriptBase: createAlexTypeScriptBaseConfig(alexPlugin),
  alexTypeScriptReactBase: createAlexTypeScriptReactBaseConfig(alexPlugin),
  typeScriptBase,
  typeScriptReactBase,
};

export default alexPlugin;

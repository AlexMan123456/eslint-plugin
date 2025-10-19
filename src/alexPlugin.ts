import type { Linter } from "eslint";

import { name, version } from "package.json";

import {
  createAlexJavaScriptBaseConfig,
  createAlexPluginBaseConfig,
  createAlexReactBaseConfig,
  createAlexTypeScriptBaseConfig,
  createAlexTypeScriptReactBaseConfig,
  javaScriptBase,
  reactBase,
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
    alexJavaScriptBase: Linter.Config[];
    alexTypeScriptBase: Linter.Config[];
    alexTypeScriptReactBase: Linter.Config[];
    alexReactBase: Linter.Config[];
    javaScriptBase: Linter.Config[];
    typeScriptBase: Linter.Config[];
    typeScriptReactBase: Linter.Config[];
    reactBase: Linter.Config[];
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
    alexJavaScriptBase: [] as Linter.Config[],
    alexTypeScriptBase: [] as Linter.Config[],
    alexTypeScriptReactBase: [] as Linter.Config[],
    alexReactBase: [] as Linter.Config[],
    javaScriptBase: [] as Linter.Config[],
    typeScriptBase: [] as Linter.Config[],
    typeScriptReactBase: [] as Linter.Config[],
    reactBase: [] as Linter.Config[],
  },
  rules,
};

alexPlugin.configs = {
  alexPluginBase: createAlexPluginBaseConfig(alexPlugin),
  alexJavaScriptBase: createAlexJavaScriptBaseConfig(alexPlugin),
  alexTypeScriptBase: createAlexTypeScriptBaseConfig(alexPlugin),
  // eslint-disable-next-line @typescript-eslint/no-deprecated
  alexTypeScriptReactBase: createAlexTypeScriptReactBaseConfig(alexPlugin),
  alexReactBase: createAlexReactBaseConfig(alexPlugin),
  javaScriptBase,
  typeScriptBase,
  typeScriptReactBase,
  reactBase,
};

export default alexPlugin;

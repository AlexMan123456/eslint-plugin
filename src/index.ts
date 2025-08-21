import type { Linter } from "eslint";

import { name, version } from "package.json";

import {
  createAlexTypeScriptBaseConfig,
  createAlexTypeScriptReactBaseConfig,
  prettierRules,
  warnOnFixButErrorOnLint,
} from "src/configs";
import rules from "src/rules";

export interface AlexPlugin {
  meta: {
    name: typeof name;
    version: typeof version;
    namespace: "alextheman";
  };
  configs: {
    alexTypeScriptBase: Linter.Config[];
    alexTypeScriptReactBase: Linter.Config[];
  };
  rules: Record<string, any>;
}

export { prettierRules, warnOnFixButErrorOnLint };

const plugin: AlexPlugin = {
  meta: {
    name,
    version,
    namespace: "alextheman",
  },
  configs: {
    alexTypeScriptBase: [] as Linter.Config[],
    alexTypeScriptReactBase: [] as Linter.Config[],
  },
  rules,
};

plugin.configs = {
  alexTypeScriptBase: createAlexTypeScriptBaseConfig(plugin),
  alexTypeScriptReactBase: createAlexTypeScriptReactBaseConfig(plugin),
};

export default plugin;

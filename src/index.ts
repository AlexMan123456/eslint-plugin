import type { Linter } from "eslint";

import {
  createAlexTypeScriptBaseConfig,
  createAlexTypeScriptReactBaseConfig,
  prettierRules,
} from "src/configs";
import rules from "src/rules";

import { name, version } from "package.json";

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

export { prettierRules };

const plugin = {
  meta: {
    name,
    version,
    namespace: "alextheman",
  },
  configs: { alexTypeScriptBase: [], alexTypeScriptReactBase: [] },
  rules,
} satisfies AlexPlugin;

/* I don't love the any type here, but I also don't know why it keeps trying to type my configs as never when 
I literally declare them as Linter.Config[] in the interface... But I also can't be bothered to fight TypeScript anymore
when I can literally see with my own eyes that my code works as intended, so I won't. Please submit a pull request if you
know how to get rid of the any types. But until someone does, I'm dropping the any bomb. */
plugin.configs = {
  alexTypeScriptBase: createAlexTypeScriptBaseConfig(plugin),
  alexTypeScriptReactBase: createAlexTypeScriptReactBaseConfig(plugin),
} as any;

export default plugin;

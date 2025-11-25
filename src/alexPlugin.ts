import { name, version } from "package.json" with { type: "json" };

import createAlexPluginConfigs from "src/configs";
import rules from "src/rules";

export interface AlexPlugin {
  meta: {
    name: typeof name;
    version: typeof version;
    namespace: "alextheman";
  };
  configs: ReturnType<typeof createAlexPluginConfigs>;
  rules: Record<string, any>;
}

const alexPlugin: AlexPlugin = {
  meta: {
    name,
    version,
    namespace: "alextheman",
  },
  configs: {} as ReturnType<typeof createAlexPluginConfigs>,
  rules,
};

alexPlugin.configs = createAlexPluginConfigs(alexPlugin);

export default alexPlugin;

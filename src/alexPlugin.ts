import { name, version } from "package.json";

import {
  createCombinedJavaScriptBaseConfig,
  createCombinedReactBaseConfig,
  createCombinedTestsBaseConfig,
  createCombinedTypeScriptBaseConfig,
  createCombinedTypeScriptReactBaseConfig,
  createPluginBaseConfig,
  createPluginTestsBaseConfig,
  javaScriptBase,
  reactBase,
  typeScriptBase,
} from "src/configs";
import createCombinedJavaScriptReactBaseConfig from "src/configs/combined/javaScriptReactBase";
import testsBase from "src/configs/general/testsBase";
import rules from "src/rules";
import createPluginConfigs from "src/utility/createPluginConfigs";

export interface AlexPlugin {
  meta: {
    name: typeof name;
    version: typeof version;
    namespace: "alextheman";
  };
  configs: ReturnType<typeof createPluginConfigs>;
  rules: Record<string, any>;
}

const alexPlugin: AlexPlugin = {
  meta: {
    name,
    version,
    namespace: "alextheman",
  },
  configs: {},
  rules,
};

alexPlugin.configs = createPluginConfigs({
  general: {
    javaScript: javaScriptBase,
    typeScript: typeScriptBase,
    react: reactBase,
    tests: testsBase,
  },
  plugin: {
    base: createPluginBaseConfig(alexPlugin),
    tests: createPluginTestsBaseConfig(alexPlugin),
  },
  combined: {
    javaScript: createCombinedJavaScriptBaseConfig(alexPlugin),
    typeScript: createCombinedTypeScriptBaseConfig(alexPlugin),
    react: createCombinedReactBaseConfig(alexPlugin),
    tests: createCombinedTestsBaseConfig(alexPlugin),
    typeScriptReact: createCombinedTypeScriptReactBaseConfig(alexPlugin),
    javaScriptReact: createCombinedJavaScriptReactBaseConfig(alexPlugin),
  },
});

export default alexPlugin;

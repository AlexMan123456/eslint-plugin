import packageJson from "eslint-plugin-package-json";
import { name, version } from "package.json";

import {
  createCombinedJavaScriptBaseConfig,
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
import combinedReactBaseConfig from "src/configs/combined/reactBase";
import {
  createPersonalJavaScriptBaseConfig,
  createPersonalTypeScriptBaseConfig,
  neurosongsBackEndConfig,
  neurosongsFrontEndConfig,
  personalReactBaseConfig,
  personalTestsBaseConfig,
} from "src/configs/personal";
import createPersonalEslintPluginConfig from "src/configs/personal/eslintPlugin";
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
  },
  plugin: {
    base: createPluginBaseConfig(alexPlugin),
    tests: createPluginTestsBaseConfig(alexPlugin),
  },
  personal: {
    javaScript: createPersonalJavaScriptBaseConfig(alexPlugin),
    typeScript: createPersonalTypeScriptBaseConfig(alexPlugin),
    react: personalReactBaseConfig,
    tests: personalTestsBaseConfig,
    eslintPlugin: createPersonalEslintPluginConfig(alexPlugin),
    neurosongsBackEnd: neurosongsBackEndConfig,
    neursongsFrontEnd: neurosongsFrontEndConfig,
  },
  combined: {
    javaScript: [
      ...createCombinedJavaScriptBaseConfig(alexPlugin),
      packageJson.configs.recommended,
    ],
    typeScript: [
      ...createCombinedTypeScriptBaseConfig(alexPlugin),
      packageJson.configs.recommended,
    ],
    react: [...combinedReactBaseConfig, packageJson.configs.recommended],
    tests: [...createCombinedTestsBaseConfig(alexPlugin), packageJson.configs.recommended],
    typeScriptReact: [
      ...createCombinedTypeScriptReactBaseConfig(alexPlugin),
      packageJson.configs.recommended,
    ],
    javaScriptReact: [
      ...createCombinedJavaScriptReactBaseConfig(alexPlugin),
      packageJson.configs.recommended,
    ],
  },
});

export default alexPlugin;

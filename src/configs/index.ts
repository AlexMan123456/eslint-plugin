import type { Linter } from "eslint";
import type { AlexPlugin } from "src/alexPlugin";
import type { ConfigKey } from "src/configs/AlexPluginConfigGroup";

import packageJson from "eslint-plugin-package-json";

import {
  combinedReactBaseConfig,
  createCombinedJavaScriptBaseConfig,
  createCombinedJavaScriptReactBaseConfig,
  createCombinedTestsBaseConfig,
  createCombinedTypeScriptBaseConfig,
  createCombinedTypeScriptReactBaseConfig,
} from "src/configs/combined";
import { javaScriptBase, reactBase, typeScriptBase } from "src/configs/general";
import {
  createPersonalEslintPluginConfig,
  createPersonalJavaScriptBaseConfig,
  createPersonalTypeScriptBaseConfig,
  neurosongsBackEndConfig,
  neurosongsFrontEndConfig,
  personalReactBaseConfig,
  personalTestsBaseConfig,
  utilityConfig,
} from "src/configs/personal";
import { createPluginBaseConfig, createPluginTestsBaseConfig } from "src/configs/plugin";
import createPluginConfigs from "src/utility/createPluginConfigs";

function createAlexPluginConfigs(plugin: AlexPlugin): Record<ConfigKey, Linter.Config[]> {
  return createPluginConfigs({
    combined: {
      javaScript: [...createCombinedJavaScriptBaseConfig(plugin), packageJson.configs.recommended],
      javaScriptReact: [
        ...createCombinedJavaScriptReactBaseConfig(plugin),
        packageJson.configs.recommended,
      ],
      react: [...combinedReactBaseConfig, packageJson.configs.recommended],
      tests: [...createCombinedTestsBaseConfig(plugin), packageJson.configs.recommended],
      typeScript: [...createCombinedTypeScriptBaseConfig(plugin), packageJson.configs.recommended],
      typeScriptReact: [
        ...createCombinedTypeScriptReactBaseConfig(plugin),
        packageJson.configs.recommended,
      ],
    },
    general: {
      javaScript: javaScriptBase,
      react: reactBase,
      typeScript: typeScriptBase,
    },
    personal: {
      eslintPlugin: createPersonalEslintPluginConfig(plugin),
      javaScript: createPersonalJavaScriptBaseConfig(plugin),
      neurosongsBackEnd: neurosongsBackEndConfig,
      neurosongsFrontEnd: neurosongsFrontEndConfig,
      react: personalReactBaseConfig,
      tests: personalTestsBaseConfig,
      typeScript: createPersonalTypeScriptBaseConfig(plugin),
      utility: utilityConfig,
    },
    plugin: {
      base: createPluginBaseConfig(plugin),
      tests: createPluginTestsBaseConfig(plugin),
    },
  });
}

export default createAlexPluginConfigs;

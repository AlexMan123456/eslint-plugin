import type { Linter } from "eslint";
import type { AlexPlugin } from "src/alexPlugin";
import type { ConfigKey } from "src/configs/AlexPluginConfigGroup";

import {
  combinedReactBaseConfig,
  createCombinedJavaScriptBaseConfig,
  createCombinedJavaScriptReactBaseConfig,
  createCombinedTestsBaseConfig,
  createCombinedTypeScriptBaseConfig,
  createCombinedTypeScriptReactBaseConfig,
} from "src/configs/combined";
import { javaScriptBase, reactBase, typeScriptBase } from "src/configs/general";
import packageJsonConfig from "src/configs/general/packageJson";
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
import alexCLineConfig from "src/configs/personal/alexCLine";
import { createPluginBaseConfig, createPluginTestsBaseConfig } from "src/configs/plugin";
import createPluginConfigs from "src/utility/createPluginConfigs";

function createAlexPluginConfigs(plugin: Readonly<AlexPlugin>): Record<ConfigKey, Linter.Config[]> {
  return createPluginConfigs({
    combined: {
      javaScript: [...createCombinedJavaScriptBaseConfig(plugin), ...packageJsonConfig],
      javaScriptReact: [...createCombinedJavaScriptReactBaseConfig(plugin), ...packageJsonConfig],
      react: [...combinedReactBaseConfig, ...packageJsonConfig],
      tests: [...createCombinedTestsBaseConfig(plugin), ...packageJsonConfig],
      typeScript: [...createCombinedTypeScriptBaseConfig(plugin), ...packageJsonConfig],
      typeScriptReact: [...createCombinedTypeScriptReactBaseConfig(plugin), ...packageJsonConfig],
    },
    general: {
      javaScript: javaScriptBase,
      packageJson: packageJsonConfig,
      react: reactBase,
      typeScript: typeScriptBase,
    },
    personal: {
      alexCLine: alexCLineConfig,
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

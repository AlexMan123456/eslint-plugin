import type { Linter } from "eslint";

import type { AlexPlugin } from "src/alexPlugin";
import type { AlexConfigKey } from "src/configs/AlexPluginConfigGroup";

import {
  combinedJavaScript,
  combinedJavaScriptReact,
  combinedReact,
  combinedTests,
  combinedTypeScript,
  combinedTypeScriptPackage,
  combinedTypeScriptReact,
} from "src/configs/combined";
import {
  generalJavaScript,
  generalPackageJson,
  generalReact,
  generalTypeScript,
} from "src/configs/general";
import {
  personalAlexCLine,
  personalComponents,
  personalEslintPlugin,
  personalJavaScript,
  personalNeurosongsBackEnd,
  personalNeurosongsFrontEnd,
  personalReact,
  personalTests,
  personalTypeScript,
  personalTypeScriptPackage,
  personalUtility,
} from "src/configs/personal";
import { pluginBase, pluginTests } from "src/configs/plugin";
import createPluginConfigs from "src/utility/private/createPluginConfigs";

function createAlexPluginConfigs(
  plugin: Readonly<AlexPlugin>,
): Record<AlexConfigKey, Linter.Config[]> {
  return createPluginConfigs({
    combined: {
      javaScript: [...combinedJavaScript(plugin), ...generalPackageJson],
      javaScriptReact: [...combinedJavaScriptReact(plugin), ...generalPackageJson],
      react: [...combinedReact, ...generalPackageJson],
      tests: [...combinedTests(plugin), ...generalPackageJson],
      typeScript: [...combinedTypeScript(plugin), ...generalPackageJson],
      typeScriptPackage: [...combinedTypeScriptPackage(plugin), ...generalPackageJson],
      typeScriptReact: [...combinedTypeScriptReact(plugin), ...generalPackageJson],
    },
    general: {
      javaScript: generalJavaScript,
      packageJson: generalPackageJson,
      react: generalReact,
      typeScript: generalTypeScript,
    },
    personal: {
      alexCLine: personalAlexCLine,
      components: personalComponents,
      eslintPlugin: personalEslintPlugin(plugin),
      javaScript: personalJavaScript(plugin),
      neurosongsBackEnd: personalNeurosongsBackEnd,
      neurosongsFrontEnd: personalNeurosongsFrontEnd,
      react: personalReact,
      tests: personalTests,
      typeScript: personalTypeScript(plugin),
      typeScriptPackage: personalTypeScriptPackage,
      utility: personalUtility,
    },
    plugin: {
      base: pluginBase(plugin),
      tests: pluginTests(plugin),
    },
  });
}

export default createAlexPluginConfigs;

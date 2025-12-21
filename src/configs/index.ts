import type { Linter } from "eslint";

import type { AlexPlugin } from "src/alexPlugin";
import type { AlexFlattenedConfigName } from "src/configs/AlexPluginConfigGroup";

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
import flattenConfigs from "src/utility/public/flattenConfigs";

function createAlexPluginConfigs(
  plugin: Readonly<AlexPlugin>,
): Record<AlexFlattenedConfigName, Linter.Config[]> {
  return flattenConfigs({
    combined: {
      javascript: [...combinedJavaScript(plugin), ...generalPackageJson],
      javascriptReact: [...combinedJavaScriptReact(plugin), ...generalPackageJson],
      react: [...combinedReact, ...generalPackageJson],
      tests: [...combinedTests(plugin), ...generalPackageJson],
      typescript: [...combinedTypeScript(plugin), ...generalPackageJson],
      typescriptPackage: [...combinedTypeScriptPackage(plugin), ...generalPackageJson],
      typescriptReact: [...combinedTypeScriptReact(plugin), ...generalPackageJson],
    },
    general: {
      javascript: generalJavaScript,
      packageJson: generalPackageJson,
      react: generalReact,
      typescript: generalTypeScript,
    },
    personal: {
      alexCLine: personalAlexCLine,
      components: personalComponents,
      eslintPlugin: personalEslintPlugin(plugin),
      javascript: personalJavaScript(plugin),
      neurosongsBackEnd: personalNeurosongsBackEnd,
      neurosongsFrontEnd: personalNeurosongsFrontEnd,
      react: personalReact,
      tests: personalTests,
      typescript: personalTypeScript(plugin),
      typescriptPackage: personalTypeScriptPackage,
      utility: personalUtility,
    },
    plugin: {
      base: pluginBase(plugin),
      tests: pluginTests(plugin),
    },
  });
}

export default createAlexPluginConfigs;

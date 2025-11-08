import type { Linter } from "eslint";

import createConfigGroup from "src/utility/createConfigGroup";

export interface AlexPluginConfigs {
  general: {
    javaScript: Linter.Config[];
    typeScript: Linter.Config[];
    react: Linter.Config[];
  };
  plugin: {
    base: Linter.Config[];
    tests: Linter.Config[];
  };
  combined: {
    javaScript: Linter.Config[];
    typeScript: Linter.Config[];
    react: Linter.Config[];
    tests: Linter.Config[];
    typeScriptReact: Linter.Config[];
    javaScriptReact: Linter.Config[];
  };
  personal: {
    javaScript: Linter.Config[];
    typeScript: Linter.Config[];
    react: Linter.Config[];
    tests: Linter.Config[];
  };
}

function createPluginConfigs(
  config: AlexPluginConfigs,
): Record<`${string}/${string}`, Linter.Config[]> {
  const allConfigs: Record<string, Linter.Config[]> = {};
  for (const group in config) {
    Object.assign(allConfigs, createConfigGroup(group, config[group as keyof AlexPluginConfigs]));
  }
  return allConfigs;
}

export default createPluginConfigs;

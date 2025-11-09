import type { Linter } from "eslint";
import type { AlexPluginConfigGroup, ConfigKey } from "src/alexPlugin/AlexPluginConfigGroup";

import createConfigGroup from "src/utility/createConfigGroup";

function createPluginConfigs(config: AlexPluginConfigGroup): Record<ConfigKey, Linter.Config[]> {
  const allConfigs: Record<string, Linter.Config[]> = {};
  for (const group in config) {
    Object.assign(
      allConfigs,
      createConfigGroup(group, config[group as keyof AlexPluginConfigGroup]),
    );
  }
  return allConfigs;
}

export default createPluginConfigs;

import type { Linter } from "eslint";
import type { AlexPluginConfigGroup, ConfigKey } from "src/configs/AlexPluginConfigGroup";

import createConfigGroup from "src/utility/private/createConfigGroup";

function createPluginConfigs(config: AlexPluginConfigGroup): Record<ConfigKey, Linter.Config[]> {
  const allConfigs = {} as Record<ConfigKey, Linter.Config[]>;
  for (const configGroupEntries of Object.entries(config) as Parameters<
    typeof createConfigGroup
  >[]) {
    Object.assign(allConfigs, createConfigGroup(...configGroupEntries));
  }
  return allConfigs satisfies Record<ConfigKey, Linter.Config[]>;
}

export default createPluginConfigs;

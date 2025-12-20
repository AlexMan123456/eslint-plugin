import type { Linter } from "eslint";

import type { AlexPluginConfigGroup, AlexConfigKey } from "src/configs/AlexPluginConfigGroup";

import createConfigGroup from "src/utility/private/createConfigGroup";

function createPluginConfigs(
  config: AlexPluginConfigGroup,
): Record<AlexConfigKey, Linter.Config[]> {
  const allConfigs = {} as Record<AlexConfigKey, Linter.Config[]>;
  for (const configGroupEntries of Object.entries(config) as Parameters<
    typeof createConfigGroup
  >[]) {
    Object.assign(allConfigs, createConfigGroup(...configGroupEntries));
  }
  return allConfigs satisfies Record<AlexConfigKey, Linter.Config[]>;
}

export default createPluginConfigs;

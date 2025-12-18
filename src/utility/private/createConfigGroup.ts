import type { Linter } from "eslint";

import type { ConfigGroupName, ConfigKey } from "src/configs/AlexPluginConfigGroup";

import camelToKebab from "src/utility/private/camelToKebab";

function createConfigGroup(
  group: ConfigGroupName,
  configs: Record<string, Linter.Config[]>,
): Record<ConfigKey, Linter.Config[]> {
  const newConfigs: Record<string, Linter.Config[]> = {};
  for (const key in configs) {
    newConfigs[`${camelToKebab(group)}/${camelToKebab(key)}`] = configs[key];
  }
  return newConfigs;
}

export default createConfigGroup;

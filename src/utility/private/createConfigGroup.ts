import type { Linter } from "eslint";

import type { ConfigKey } from "src/utility/public/ConfigKey";

import camelToKebab from "src/utility/private/camelToKebab";

function createConfigGroup<
  ConfigGroup extends { [K in keyof ConfigGroup]: Record<string, Linter.Config[]> },
>(
  group: keyof ConfigGroup,
  configs: Record<string, Linter.Config[]>,
): Record<ConfigKey<ConfigGroup>, Linter.Config[]> {
  const newConfigs: Record<string, Linter.Config[]> = {};
  for (const key in configs) {
    newConfigs[`${camelToKebab(group as string)}/${camelToKebab(key)}`] = configs[key];
  }
  return newConfigs;
}

export default createConfigGroup;

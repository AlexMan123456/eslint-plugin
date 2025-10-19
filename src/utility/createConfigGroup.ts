import type { Linter } from "eslint";

import camelToKebab from "src/utility/camelToKebab";

function createConfigGroup(
  group: string,
  configs: Record<string, Linter.Config[]>,
): Record<`${string}/${string}`, Linter.Config[]> {
  const newConfigs: Record<string, Linter.Config[]> = {};
  for (const key in configs) {
    newConfigs[`${camelToKebab(group)}/${camelToKebab(key)}`] = configs[key];
  }
  return newConfigs;
}

export default createConfigGroup;

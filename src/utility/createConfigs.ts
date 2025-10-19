import type { Linter } from "eslint";

import createConfigGroup from "src/utility/createConfigGroup";

function createConfigs(
  config: Record<string, Record<string, Linter.Config[]>>,
): Record<`${string}/${string}`, Linter.Config[]> {
  const allConfigs: Record<string, Linter.Config[]> = {};
  for (const group in config) {
    Object.assign(allConfigs, createConfigGroup(group, config[group]));
  }
  return allConfigs;
}

export default createConfigs;

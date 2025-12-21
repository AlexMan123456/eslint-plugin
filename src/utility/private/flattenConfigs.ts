import type { Linter } from "eslint";

import type { ConfigKey } from "src/utility/public/ConfigKey";

import createConfigGroup from "src/utility/private/createConfigGroup";

function flattenConfigs<
  ConfigGroup extends { [K in keyof ConfigGroup]: Record<string, Linter.Config[]> },
>(config: ConfigGroup): Record<ConfigKey<ConfigGroup>, Linter.Config[]> {
  const allConfigs = {} as Record<ConfigKey<ConfigGroup>, Linter.Config[]>;
  for (const configGroupEntries of Object.entries(config) as Parameters<
    typeof createConfigGroup<ConfigGroup>
  >[]) {
    Object.assign(allConfigs, createConfigGroup<ConfigGroup>(...configGroupEntries));
  }
  return allConfigs satisfies Record<ConfigKey<ConfigGroup>, Linter.Config[]>;
}

export default flattenConfigs;

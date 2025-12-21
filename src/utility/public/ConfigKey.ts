import type { Linter } from "eslint";

import type { CamelToKebab } from "src/utility/private/camelToKebab";

export type ConfigKey<
  ConfigGroup extends { [K in keyof ConfigGroup]: Record<string, Linter.Config[]> },
> = {
  [Group in keyof ConfigGroup &
    string]: `${CamelToKebab<Group>}/${CamelToKebab<keyof ConfigGroup[Group] & string>}`;
}[keyof ConfigGroup & string];

import type { Linter } from "eslint";

import type { CamelToKebab } from "src/utility/private/camelToKebab";

export type GetFlattenedConfigNames<
  ConfigObject extends { [K in keyof ConfigObject]: Record<string, Linter.Config[]> },
> = {
  [Group in keyof ConfigObject &
    string]: `${CamelToKebab<Group>}/${CamelToKebab<keyof ConfigObject[Group] & string>}`;
}[keyof ConfigObject & string];

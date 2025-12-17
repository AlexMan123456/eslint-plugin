import type { Linter } from "eslint";

import type { CamelToKebab } from "src/utility/private/camelToKebab";

export type GeneralConfig = "javaScript" | "typeScript" | "react" | "packageJson";
export type PluginConfig = "base" | "tests";
export type PersonalConfig =
  | "javaScript"
  | "typeScript"
  | "react"
  | "tests"
  | "eslintPlugin"
  | "neurosongsBackEnd"
  | "neurosongsFrontEnd"
  | "utility"
  | "alexCLine"
  | "typeScriptPackage"
  | "components";
export type CombinedConfig =
  | "javaScript"
  | "typeScript"
  | "react"
  | "tests"
  | "typeScriptReact"
  | "javaScriptReact"
  | "typeScriptPackage";

export interface AlexPluginConfigGroup {
  general: Record<GeneralConfig, Linter.Config[]>;
  plugin: Record<PluginConfig, Linter.Config[]>;
  personal: Record<PersonalConfig, Linter.Config[]>;
  combined: Record<CombinedConfig, Linter.Config[]>;
}

export type ConfigGroupName = keyof AlexPluginConfigGroup;
export type ConfigKey = {
  [Group in ConfigGroupName &
    string]: `${CamelToKebab<Group>}/${CamelToKebab<keyof AlexPluginConfigGroup[Group] & string>}`;
}[ConfigGroupName & string];

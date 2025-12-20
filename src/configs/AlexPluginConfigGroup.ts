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

export type AlexConfigGroupName = keyof AlexPluginConfigGroup;
export type AlexConfigKey = {
  [Group in AlexConfigGroupName &
    string]: `${CamelToKebab<Group>}/${CamelToKebab<keyof AlexPluginConfigGroup[Group] & string>}`;
}[AlexConfigGroupName & string];

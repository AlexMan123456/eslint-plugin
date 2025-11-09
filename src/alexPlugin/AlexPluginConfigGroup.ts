import type { Linter } from "eslint";
import type { CamelToKebab } from "src/utility/camelToKebab";

export type GeneralConfig = "javaScript" | "typeScript" | "react";
export type PluginConfig = "base" | "tests";
export type PersonalConfig =
  | "javaScript"
  | "typeScript"
  | "react"
  | "tests"
  | "eslintPlugin"
  | "neurosongsBackEnd"
  | "neurosongsFrontEnd"
  | "utility";
export type CombinedConfig =
  | "javaScript"
  | "typeScript"
  | "react"
  | "tests"
  | "typeScriptReact"
  | "javaScriptReact";

export interface AlexPluginConfigGroup {
  general: Record<GeneralConfig, Linter.Config[]>;
  plugin: Record<PluginConfig, Linter.Config[]>;
  personal: Record<PersonalConfig, Linter.Config[]>;
  combined: Record<CombinedConfig, Linter.Config[]>;
}

export type ConfigKey = {
  [G in keyof AlexPluginConfigGroup &
    string]: `${CamelToKebab<G>}/${CamelToKebab<keyof AlexPluginConfigGroup[G] & string>}`;
}[keyof AlexPluginConfigGroup & string];

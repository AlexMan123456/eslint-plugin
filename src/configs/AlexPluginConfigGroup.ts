import type { Linter } from "eslint";

import type { GetFlattenedConfigNames } from "src/utility/public/GetFlattenedConfigNames";

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

export interface AlexPluginConfigObject {
  general: Record<GeneralConfig, Linter.Config[]>;
  plugin: Record<PluginConfig, Linter.Config[]>;
  personal: Record<PersonalConfig, Linter.Config[]>;
  combined: Record<CombinedConfig, Linter.Config[]>;
}

export type AlexConfigGroupName = keyof AlexPluginConfigObject;

export type AlexConfigKey = GetFlattenedConfigNames<AlexPluginConfigObject>;
export type AlexPluginConfigFlattened = Record<AlexConfigKey, Linter.Config[]>;

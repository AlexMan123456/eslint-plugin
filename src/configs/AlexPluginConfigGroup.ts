import type { Linter } from "eslint";

import type { GetFlattenedConfigNames } from "src/utility/public/GetFlattenedConfigNames";

export type GeneralConfig = "javascript" | "typescript" | "react" | "packageJson";
export type PluginConfig = "base" | "tests";
export type PersonalConfig =
  | "javascript"
  | "typescript"
  | "react"
  | "tests"
  | "eslintPlugin"
  | "neurosongsBackEnd"
  | "neurosongsFrontEnd"
  | "utility"
  | "alexCLine"
  | "typescriptPackage"
  | "components";
export type CombinedConfig =
  | "javascript"
  | "typescript"
  | "react"
  | "tests"
  | "typescriptReact"
  | "javascriptReact"
  | "typescriptPackage";

export interface AlexPluginConfigObject {
  general: Record<GeneralConfig, Linter.Config[]>;
  plugin: Record<PluginConfig, Linter.Config[]>;
  personal: Record<PersonalConfig, Linter.Config[]>;
  combined: Record<CombinedConfig, Linter.Config[]>;
}

export type AlexConfigGroupName = keyof AlexPluginConfigObject;

export type AlexFlattenedConfigName = GetFlattenedConfigNames<AlexPluginConfigObject>;
export type AlexPluginConfigFlattened = Record<AlexFlattenedConfigName, Linter.Config[]>;
